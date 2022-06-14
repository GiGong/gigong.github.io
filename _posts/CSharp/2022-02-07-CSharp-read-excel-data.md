---
layout: post
title:  "C# 엑셀 데이터 읽어오기 (Read Excel Data)"
date:   2022-02-07 17:35
categories: [C#]
tags: [c#, excel, read, load, data]
excerpt_separator: <!--read more-->
---


<!-- header for toc -->
{% include post_function/post_navigation_heading.html level="1" number="0" content="시작" %}

<!--start excerpt-->
윈도우 프로그램은 특히 엑셀 파일을 읽을 일이 자주 있습니다.  
C#으로 엑셀 파일에서 데이터를 읽어오는 방법에 대해 알아보겠습니다.
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

편의를 위해 using문을 추가해줍니다.

{% highlight csharp linenos %}
using System.Runtime.InteropServices;
using Excel = Microsoft.Office.Interop.Excel;
{% endhighlight %}


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="2" number="1.3" content="Excel Data 읽어오는 함수" %}

<!-- #region code -->
{% highlight csharp linenos %}
private static string[][] ReadExcelData(string path, int numOfColumn)
{
    uint excelProcessId = 0;
    Excel.Application excelApp = null;
    Excel.Workbook wb = null;
    Excel.Worksheet ws = null;

    List<string[]> result = new List<string[]>();

    try
    {
        // 엑셀 프로그램 실행
        excelApp = new Excel.Application();
        GetWindowThreadProcessId(new IntPtr(excelApp.Hwnd), out excelProcessId);

        // 엑셀 파일 열기
        wb = excelApp.Workbooks.Open(path);

        // 첫번째 Worksheet
        ws = wb.Worksheets.get_Item(1) as Excel.Worksheet;

        // 현재 Worksheet에서 사용된 Range 전체를 선택
        Excel.Range rng = ws.UsedRange;

        //int row = ws.UsedRange.EntireRow.Count;
        //Excel.Range rng = ws.Range[ws.Cells[1, 1], ws.Cells[row, numOfColumn]];


        // Range 데이타를 배열 (1-based array)로
        object[,] data = (object[,])rng.Value;

        for (int r = 1; r <= data.GetLength(0); r++)
        {
            int length = Math.Min(data.GetLength(1), numOfColumn);
            string[] arr = new string[length];

            for (int c = 1; c <= length; c++)
            {
                if (data[r, c] == null)
                {
                    continue;
                }
                else if (data[r, c] is string)
                {
                    arr[c - 1] = data[r, c] as string;
                }
                else
                {
                    arr[c - 1] = data[r, c].ToString();
                }
            }

            for (int i = 0; i < arr.Length; i++)
            {
                if (string.IsNullOrWhiteSpace(arr[i]) == false)
                {
                    result.Add(arr);
                    break;
                }
            }

        }

        wb.Close(false);
        excelApp.Quit();
    }
    catch (Exception)
    {
        throw;
    }
    finally
    {
        // Clean up
        ReleaseExcelObject(ws);
        ReleaseExcelObject(wb);
        ReleaseExcelObject(excelApp);

        if (excelApp != null && excelProcessId > 0)
        {
            Process.GetProcessById((int)excelProcessId).Kill();
        }
    }

    return result.ToArray();
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
{% include post_function/post_navigation_heading.html level="2" number="1.5" content="Excel Process를 Kill 해주기 위한 코드" %}

{% highlight csharp linenos %}
[DllImport("user32.dll", SetLastError = true)]
static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint lpdwProcessId);
{% endhighlight %}


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="1" number="2" content="알아보기" %}

*<sub>Excel은 index가 1부터 시작합니다.(1-based)</sub>*

엑셀의 '셀 서식' 중 숫자는 double 형으로 변환되며, 나머지는 string 형이 됩니다.


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="2" number="2.1" content="코드 설명" %}

ReadExcelData 함수입니다. 여기서는 데이터를 string[][] 형으로 저장합니다.

  - 20번 줄에서 Worksheets.get_Item() 의 매개변수로 현재 사용할 Worksheets의 번호를 설정하시면 됩니다.

  - 23번 줄에서 UsedRange로 Excel에서 사용한 Data의 범위를 가져옵니다. 여기서 UsedRange는 한번이라도 사용·수정이 되었다면 포함되므로, 읽어들일 때 따로 처리가 필요할 수 있습니다.

  - 26번 줄은 사용한 전체 범위가 아닌 특정 범위만 사용하는 방법입니다.  
  ws.Range[ws.Cells[시작 X, 시작 Y], ws.Cells[종료 X, 종료 Y]] 와 같이 사용하면 됩니다.

  - 49번 줄은 엑셀의 Cell 서식 중 숫자같이 string으로 바로 변환되지 않는 값들을 위한 코드입니다.

  - 55번 줄은 위에서 말한 UsedRange에 포함된 '사용되었지만 현재 값이 없는' row를 없애기 위한 코드입니다.

  - 64번 줄의 wb.Close에서 false는 저장 여부이며, 우리는 읽기만 했으니 false로 넘겨줍니다.

  - 78번 줄의 if 문단은 C#에서 Excel을 사용할 때 고질적인 에러를 해결하기 위한 코드입니다. 아래 [2.2](#nav-2-2){:.nav_content}에서 내용을 보겠습니다.


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="2" number="2.2" content="주의사항" %}

finally 문단에서 **ReleaseExcelObject()**는 꼭 해주어야 하며, 이를 실행해도 간혹 Excel 프로세스가 종료되지 않고 남아있는 경우가 있습니다. 그때를 대비하여 3, 14, 80번 줄이 있어야 하고, 같은 범위에 [1.5 Excel Process를 Kill 해주기 위한 코드](#nav-1-5){:.nav_content}를 선언해 주어야 사용 가능합니다.


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="1" number="000" content="그 외" %}


예시로 C# 콘솔 프로젝트를 [GitHub][GitHub-Sample]에 업로드 해놓았으니, 한 번 보시면서 활용하시면 좋을 것 같습니다.




<!-- reference area -->
  - <https://www.codeproject.com/Answers/74997/Close-Excel-Process-with-Interop#answer1>
{% include post_function/reference_area_setter.html %}




[GitHub-Sample]: https://github.com/GiGong/BlogPostSample/tree/master/Console/ReadExcelData
[Origin-Tistory-Post]: https://gigong.tistory.com/4
[Reference-1]: https://www.codeproject.com/Answers/74997/Close-Excel-Process-with-Interop#answer1