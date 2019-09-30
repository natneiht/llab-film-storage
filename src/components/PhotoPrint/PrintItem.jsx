import React, { PureComponent } from 'react';

export default class PrintItem extends PureComponent {
	render() {
        const { printStyle, printSize } = this.props;
		return (
			<tr>
				<td className="print-style">
					<input type="checkbox" name="imageStyle" value={printStyle.printName} />
					<span>{printStyle.printName}</span>
				</td>
				{printSize.map(size => (
					<td>
						{printStyle.printSize.includes(size) ? <input type="radio" name="image_size" /> : null}
					</td>
				))}
			</tr>
		);
	}
}
