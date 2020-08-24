const Rtf = require('./src/rtf/rtf.class');

var htmlOfExample = `
<html>
	<head>
		<style>
			.test {
				color: rgb(20, 20, 20);
				background:#333;
			}
		</style>
	</head>
	<body>
		<h1>Title <span style="color:rgb(255,0,0);">with</span> tag h1<h1>
		<h2>image:</h2>
		<h1 style="font-size:80px;">Test</h1>
		<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABdCAAAAAAeDx7VAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxIAAAsSAdLdfvwAAAGxSURBVFjD7dctdsMwDABgQcPCwMDCwsHAwsLCwcLeoLBHCMwRDAsHB3uMHCFQs52sP4llW7H33oDEmtZf/WxZcgD/IEBQQQUVVFBBOaFrqLvCaK8AQGWgt9oA7/MaH50y0ApcqNkj7flpOjqab/MyH/fen3LQhEf/ATUbXbdmc5quIHqeFvVlq/LR4fNXLYg+2Of+T3+yOFNZJ0rBMnez0asnd7NRKgQVVFBBw3Fr2vKouThciqO2RyWqjB61t+W4L4uOqrquQV/7+lw9WDVhrgu08lwNH6GVt3tGUaqXj3H2ds9MFPUO4lmwEFR0iJ1tHdwv8A0Jqy4L4M5B3ZDQiOn6c+CgODTmfjyEV+AeXnnwj9h+h9ULc6aIJ7tmKSeHg2K3MepXYRT7D5M1A5OKodhvfC9diyAKBbWJXVL1JAoFmRmHFJXILBJ1hyCmctGUo8VH3dEKpThiy0fd0Qo1Jfu2f+SiaAuH6sivTUHbeZM5iLqmRK9r5X/bj3ZTvQVoiBXoyVIVa9F3IFudqTu7dehYsqjQK9Gp1Xljj2tRfL6DzuI45KDcEFRQQQUVtEz8AL3L59EiRcoBAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTA4LTIxVDA5OjE3OjE0KzAyOjAwSUJYdgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wOC0yMVQwOToxNzoxNCswMjowMDgf4MoAAAAASUVORK5CYII="></img>
		<div id="content">
			<p style="color:#333; margin:5px;" class="test" align="center">text of p<b>start b <i>italic with  bold</i>final text of b</b><i>italic</i>final text of p</p>
			<p style="color:rgb(255,0,0);" align="right">red paragraph => right with tag</p>
			<p style="color:rgb(0,0,255); text-align:center;">blue paragraph => center with style</p>
			<table>
					<tbody>
						<tr>
							<td>
								column 1
							</td>
							<td>
								column 2
							</td>
							<td>
								column 3
							</td>
							<td>
								column 4
							</td>
						</tr>
						<tr>
							<td>content 1</td>
							<td>content 2<br></td>
							<td>content 3<br></td>
							<td>content 4<br></td>
						</tr>
					</tbody>
				</table>
		</div>
	</body>
</html>`;

let htmlToRtf = new Rtf();
htmlToRtf.saveRtfInFile('./app/files/current.rtf', htmlToRtf.convertHtmlToRtf(htmlOfExample));

const visomaTicketsHtml = `<body><h2>Headline 1</h2><h3>Headline 2</h3><h4>Headline 3</h4><p>Normal text</p><p><strong>Bold</strong></p><p><i>Italic</i></p><p><u>underlined</u></p><p><s>crosed</s></p><p><sup>uped</sup></p><p><sub>downed</sub></p><ul><li>unorderd&nbsp;</li><li>list&nbsp;<ul><li>2&nbsp;</li><li>ebene</li></ul></li></ul><ol><li>orderd&nbsp;</li><li>list&nbsp;<ol><li>2&nbsp;</li><li>ebene</li></ol></li></ol><p style="margin-left:40px;">einzug</p><p style="margin-left:80px;">einzug&nbsp;</p><p><a href="https://Test.de">link</a></p><blockquote><p>quote</p></blockquote><figure class="image"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJIAAACqCAYAAABGUhZOAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAATBSURBVHhe7d0hU+tMGEBhJBKJRCKRSCQSiUQikTgUU4lEIsEhkUgkkp+ArETm4/0moUu7FAqn6XvT88ysuNB02vTQbLZcstFIAEMSwpCEMCQhDEkIQxLCkIQwJCEMSQhDEsKQhDAkIQxJCEMSwpCEMCQhDEkIQxLCkIQwJCEMSQhDEiJlSA8PD83Ozk6zsbHx5Yjvn5+fN29vb+1WWqWUIX0XUTl2d3ebp6endkutSu8hPT4+NgcHB83t7W37lVmj0agazbxxdnbWvL6+tvegvvUe0v7+/v8v/ObmZjMej9uvLu7m5qbZ2tr6FFPcZ0So/q0spBgxF/qLeAc6PDz8FFOMi4uL9hbqS+8hxSGoe8Gpd4/7+/tmb2/PmFao95DikNS92EdHR+1X/y7O3qbfnYypP72H9Pz8/PFCx9kZqRaTc6Z+9B5SiElx90LHoY5cC6rF5Nnc8q0kpHKeFINeC4qYykn99fV1+x0ty0pCihc65kdlTDHIw1A5F4t1Ky3XSkLq1NaCYsGSEGtU5f1m0X38EyOe/1CsfA/H/KU8DMUOpuZMGUPa3t7+eEwxVxyKFHs4YirfmU5PT9vv/E13fzGyKB8T9TwzSLOHyzlNDGINqLy/LDI+JkKqZzM9AY+f2L+cupf3lUXGx0RI9Wxqa0Axj/jtJ/vl/WRRrqHF4uxQpPux+GppIF6AeIda5Kyu3D6L4+Pjj8e0yEdEcbYXyxhZz/TSvr/WPojtRpz5xAsSC40vLy/tFrPKbbIoPyKK8dO5YHe2l/VML21InXlBLTIyOTk5+fTYfhJTefuM0ofUiZ/kmCst8mu45cikNheMuOYdtsvbZvTPhFSKw1kc1mKOMb0yXhsZ12tqMcWIQ9jV1VV7q4nyNhn9kyENxVcnFt+NjAwpgUUP2xkZUiLxDjU9EZ8eWT9WMSQhDEkIQxLCkIQwJCEMSQhDEsKQhDAkIQxJCEMSwpCEMCQhDEkIQxLCkIQwJCEMSQhDEsKQhDAkIQxJCEN6d3d311xeXrb/0m8Y0ruIKP7PmH7PvSeEIQlhSEIMOqTsfy5vSAYdUvY/lzckgw6p/CseWi5DEsKQhDAkIQxJCEMSwpCEMCQhDEkIQxJi0Hu4vDYaddFl1Q06pPLaaORFlzVr0CEt66LLmjX4ycMyLrqsWWsxC52+AtFfYvJ3nOrWIqTatdF+G5O/41S3FiEFKqZye02s1d6oxRQT8EUuBV9uq4m12xu1mOIwNRqN2lvMV26nibXcGxHT9AT8p3OechtNrPXeiEvBl6vf382Z4vuGVLf2eyOuJVvGUYtpPB7P3C5WzTWx9iHV5kzfjbh9bKcJ35/fLRKTEdUZUivimHeF6/jQ19XsrxmSEIYkhCEJYUhCGJIQhiSEIQlhSEIYkhCGJIQhCWFIQhiSEIYkhCEJYUhCGJIQhiSEIQlhSEIYkhCGJIQhCWFIQhiSEIYkhCEJYUhCGJIQhiSEIQlhSEIYkhCGJIQhCWFIQhiSEIYkhCEJYUhCGJIQhiSEIQlhSEIYkhCGJIQhCWFIQhiSEIYkhCEJYUhCGJIQhiSEIQlhSEIYkhCGJIQhCWFIQhiSEIYkhCEJYUhCGJIQhiSEIQlhSEIYkgBN8x/zw1cQSPyXOAAAAABJRU5ErkJggg=="></figure><figure class="table"><table><tbody><tr><td>T</td><td>a</td><td>b</td><td>b</td><td>e</td></tr><tr><td>l</td><td>l</td><td>e</td><td>i</td><td>q</td></tr></tbody></table></figure></body>`;
const tickets = new Rtf();
tickets.saveRtfInFile('./app/files/tickets.rtf', tickets.convertHtmlToRtf(visomaTicketsHtml));