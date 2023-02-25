---
layout: post
title:  "C# 엑셀 데이터 저장하기 (Write Excel Data)"
date:   2023-02-23 20:33
categories: [C#]
tags: [c#, excel, open, write, save, store, data, 엑셀, 데이터, 파일, 쓰기, 내보내기, 저장하기]
excerpt_separator: <!--read more-->
---


<!-- header for toc -->
{% include post_function/post_navigation_heading.html level="1" number="0" content="시작" %}

저번 포스트에는 [C#으로 엑셀 파일을 읽어들이는 법][CSharp-read-excel-data]에 대해 알아보았습니다.  
이번에는 
<!--start excerpt-->
C#으로 엑셀 파일을 저장하는 방법에 대해 알아보겠습니다.
<!--read more-->

***Excel 프로그램이 설치되어 있어야 하며, 프로그램을 사용할 컴퓨터에도 설치되어 있어야 합니다.***

<sub>*※ 이 포스트는 과거 [티스토리 블로그][Origin-Tistory-Post]의 글을 개선한 글입니다.*</sub>


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="1" number="1" content="코드 먼저 보기" %}


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="2" number="1.1" content="참조 추가" %}

우선 Reference를 추가해주어야 합니다.

**프로젝트 참조추가** -> **COM** -> **Microsoft Excel 16.0 Object Library**  
<sub>*여기서 숫자(16.0)는 다를 수 있습니다.*</sub>


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="2" number="1.2" content="Using 추가" %}

편의를 위해 Excel 관련 using문을 추가해줍니다.

{% highlight csharp linenos %}
using System.Runtime.InteropServices;
using Excel = Microsoft.Office.Interop.Excel;
{% endhighlight %}


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="2" number="1.3" content="Excel Data 저장하는 함수" %}

<!-- #region code -->
{% highlight csharp linenos %}
private static bool WriteExcelData(string path, string[][] targetData)
{
    uint excelProcessId = 0;
    Excel.Application excelApp = null;
    Excel.Workbook wb = null;
    Excel.Worksheet ws = null;

    try
    {
        // Execute Excel application
        excelApp = new Excel.Application();
        GetWindowThreadProcessId(new IntPtr(excelApp.Hwnd), out excelProcessId);


        // 엑셀파일 열기 or 새로 만들기
        bool isFileExist = File.Exists(path);
        wb = isFileExist ? excelApp.Workbooks.Open(path, ReadOnly: false, Editable: true) : excelApp.Workbooks.Add(Missing.Value);

        ws = wb.Worksheets.get_Item(1) as Excel.Worksheet;
        // Worksheet 이름 설정하기
        // ws.Name = targetWorksheetName ;
        
        int row = targetData.GetLength(0);
        int column = targetData[0].Length;

        object[,] data = new object[row, column];

        for (int r = 0; r < row; r++)
        {
            for (int c = 0; c < column; c++)
            {
                data[r, c] = targetData[r][c];
            }
        }

        // row, column 번호로 Cell 접근
        // Excel.Range rng = ws.Range[ws.Cells[1, 1], ws.Cells[row, column]];

        Excel.Range rng = ws.get_Range("A1", Missing.Value);
        rng = rng.get_Resize(row, column);

        // 저장하는 여러 방법 중 두가지
        // rng.Value = data;
        rng.set_Value(Missing.Value, data);

        if (isFileExist)
        {
            wb.Save(); // 덮어쓰기
        }
        else
        {
            wb.SaveCopyAs(path); // 새 파일 만들기
        }

        wb.Close(false);
        excelApp.Quit();
    }
    catch (Exception e)
    {
        if (wb != null)
        {
            wb.Close(SaveChanges: false);
        }
        if (excelApp != null)
        {
            excelApp.Quit();
        }

        return false;
    }
    finally
    {
        ReleaseExcelObject(ws);
        ReleaseExcelObject(wb);
        ReleaseExcelObject(excelApp);

        if (excelApp != null && excelProcessId > 0)
        {
            Process.GetProcessById((int)excelProcessId).Kill();
        }
    }

    return true;
}
{% endhighlight %}
<!-- #endregion code -->


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="2" number="1.4" content="사용한 Excel을 Release 해주는 함수" %}

{% highlight csharp linenos %}
private static void ReleaseExcelObject(object obj)
{
    try
    {
        if (obj != null)
        {
            Marshal.ReleaseComObject(obj);
            obj = null;
        }
    }
    catch (Exception)
    {
        obj = null;
        throw;
    }
    finally
    {
        GC.Collect();
    }
}
{% endhighlight %}


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="2" number="1.5" content="남은 Excel Process Kill 위한 코드" %}

{% highlight csharp linenos %}
[DllImport("user32.dll", SetLastError = true)]
static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint lpdwProcessId);
{% endhighlight %}


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="1" number="2" content="알아보기" %}

파일 쓰기의 경우 2가지 경우가 있습니다.
 1. 새 파일 만들기
 2. 이미 있는 파일에 저장하기

두가지 방법 모두 확인해보겠습니다.


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="2" number="2.1" content="코드 설명" %}

주석으로 간략히 설명하였지만, 글로써 자세히 설명합니다.

> <sub>Excel은 index가 1부터 시작합니다.(1-based)  
> Missing.Value = 의미 없는 값</sub>


{% include post_function/post_navigation_heading.html level="3" number="2.1.1" content="WriteExcelData 함수" %}

1. 함수 선언  
   `bool WriteExcelData(string path, string[][] targetData)`
    * `string path` : Excel 파일 경로
    * `string[][] targetData` : 저장할 데이터
    {:.triangle_list }

1. 함수 구현
   - Line 17 : 전달받은 `path`가 존재할 경우 Workbooks의 Open(열기), 없을 경우 Add(새로 만들기)
   - Line 21 : Worksheet 이름을 설정할 수 있습니다. (기본 값은 Sheet1, Sheet2, ...)
   - Line 26 : 실제 Excel에 저장할 때에는 [다차원 object 배열][CSharp-Multidimensional-Array]이 필요합니다.
   - Line 37, 39 : Excel의 각 Cell에 접근하는 방법이 여러가지 있습니다. 익숙한 두가지를 소개합니다.
       1. Line 37 : 직접 행, 열 번호 접근
       2. Line 39 : A1, GG33 등 [A1 참조 스타일][Excel-A1-Reference-Style]  
          <sub>※ Line 40에서 크기 수정</sub>
   - Line 48 : 이미 파일이 있을 경우 덮어쓰기 = Save
   - Line 52 : 파일이 없을 경우 새로 저장하기 = Save Copy As ...  
   여기서 Copy == 현재 작성한, Memory에 Load되어 있는 Data의 Copy


{% include post_function/post_navigation_heading.html level="3" number="2.1.2" content="그 외 Code" %}

 - `void ReleaseExcelObject(object obj)` : 사용한 Excel Object를 Release(free 개념) 해줍니다.
 - WriteExcelData함수 Line 12 :  
   `GetWindowThreadProcessId(new IntPtr(excelApp.Hwnd), out excelProcessId)`  
   프로그램, Excel 오류 등으로 프로그램이 중단될 시 Excel Application이 종료되지 않는 경우가 있습니다. 
   이러한 상황을 대비하여 Process Id를 보관합니다.


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="2" number="2.2" content="주의사항" %}

 - finally에서 **ReleaseExcelObject()** 필수 (사용한 Excel Object들 해제)
 - Excel 프로세스가 종료되지 않고 남아있는 경우 대비,  
   [1.5. 남은 Excel Process Kill 위한 코드](#nav-1-5){:.nav_content} 선언 및 Process Kill 코드 사용


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="1" number="000" content="그 외" %}

예시로 C# 콘솔 프로젝트를 [GitHub][GitHub-Sample]에 업로드 해놓았으니, 보시면서 활용하시면 좋을 것 같습니다.




<!-- reference area -->
  - <https://www.codeproject.com/Answers/74997/Close-Excel-Process-with-Interop#answer1>
{% include post_function/reference_area_setter.html %}




[GitHub-Sample]: https://github.com/GiGong/BlogPostSample/tree/master/Console/WriteExcelData
[CSharp-read-excel-data]: https://www.gigong.io/2022/02/07/CSharp-read-excel-data
[Origin-Tistory-Post]: https://gigong.tistory.com/96
[CSharp-Multidimensional-Array]: https://learn.microsoft.com/ko-kr/dotnet/csharp/programming-guide/arrays/multidimensional-arrays
[Excel-A1-Reference-Style]: https://learn.microsoft.com/ko-kr/dotnet/csharp/programming-guide/arrays/multidimensional-arrays