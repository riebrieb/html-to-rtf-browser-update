# HTML To RTF
>This project convert html to rtf format in the browser. It is based on the oziresrds/html-to-rtf awesome project.
>I looked into the 20+ forks to try get the best parts glued to in one place. This could be called html-to-rtf-frankenstein lol.

> Highlight for the developers:
* Ozires for the base framework. Without him, we would not have this.
* Heron Silva for several improvements (as font-family support) (heronsilva / html-to-rtf)
* wodka for making it possible to use in browser (wodka/html-to-rtf).
* Leon Strauß for image support (MinePlay96/html-to-rtf).

If I missed some functionality in other forks, please let me know, or make a PR.

## Prerequisites
>This project work in the browser (maybe it works on the server side, but this is not the main goal.

## Installation
```
$ npm install html-to-rtf-browser
```
## Getting Started
```javascript
var htmlToRtf = require('html-to-rtf-browser');
var html = `
<h1>Title <span style="color:rgb(255,0,0);">with</span> tag h1<h1>
<div>
	<p style="color:#333; margin:5px;" class="test" align="center">
	    text of paragraph <b>text with bold <i>text with italic and bold</i></b><i>text with italic</i>
	</p>
	<p style="color:rgb(255,0,0);" align="right">red paragraph => right with tag</p>
	<p style="color:rgb(0,0,255); text-align:center;">blue paragraph => center with style</p>
	<table>
		<tbody>
			<tr>
                <td><mark>column 1</mark></td>
                <td>column 2</td>
				<td><mark>column 3</mark></td>
				<td>column 4</td>
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
`
htmlToRtf.convertHtmlToRtf(html)
// from here on, works on browser
const blob = new Blob([rtf], {type: "application/rtf;charset=utf-8"});
const link=window.URL.createObjectURL(blob);
window.location=link;

```
>  Now test in your preferred text editor (wordpad, word, libreoffice, ...).
##

##### Important:
#
> You can't copy the output of terminal.
> Save the output at a file.rtf

Ex.: 

### Allowed html tags
```html
<b>, <br>, <center>, <div>, <em>, <font>, <h1>, <h2>, <h3>, <h4>,
<h5>, <h6>, <i>, <li>, <mark>, <p>, <ol>, <s>, <span>, <sub>, <sup>,
<strong>, <table>, <td>, <th>, <tr>, <u>, <ul>, <img> (base64), <a>
```
### Allowed style properties

> color(Hex and Rgb), font-family, font-size(px/pt), text-align, text-indent (px/cm), margin-left (px/cm), padding-left (px/cm)


## Running the tests
```
$ gulp tests
```

## Author

> * **antoniolucasnobar**

## License
This project is licensed under the MIT License
