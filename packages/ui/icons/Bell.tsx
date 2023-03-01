import { FC } from 'react';
import { Path } from 'react-native-svg';

import { Svg } from '../managed';

import { IconProps } from '.';

export const BellIcon: FC<IconProps> = ({
	className,
	size = 16,
	color = 'black',
}) => {
	return (
		<Svg
			className={className}
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
		>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M4.5835 7.41667C4.5835 3.32056 7.90405 0 12.0002 0C16.0963 0 19.4168 3.32056 19.4168 7.41667V8.33334C19.4168 10.5339 19.7156 12.4847 20.171 13.8507C20.4004 14.539 20.6515 15.0238 20.8818 15.316C21.0523 15.5324 21.1541 15.5761 21.1774 15.5834C21.7248 15.5891 22.1668 16.0346 22.1668 16.5833V16.7917C22.1668 17.344 21.7191 17.7917 21.1668 17.7917H2.8335C2.28121 17.7917 1.8335 17.344 1.8335 16.7917V16.5833C1.8335 16.0346 2.27551 15.5891 2.82292 15.5834C2.84626 15.5761 2.948 15.5324 3.11851 15.316C3.34881 15.0238 3.59994 14.539 3.82936 13.8507C4.2847 12.4847 4.5835 10.5339 4.5835 8.33334V7.41667ZM2.81774 15.5847C2.81773 15.5846 2.81863 15.5844 2.82044 15.5841L2.81886 15.5845C2.81812 15.5847 2.81774 15.5847 2.81774 15.5847Z"
				fill={color}
			/>
			<Path
				d="M9.25013 19.5C8.87258 19.5 8.52722 19.7126 8.35723 20.0497C8.18723 20.3869 8.2216 20.791 8.44606 21.0945C9.27818 22.2199 10.5352 23 12.0001 23C13.465 23 14.7221 22.2199 15.5542 21.0945C15.7787 20.791 15.813 20.3869 15.643 20.0497C15.473 19.7126 15.1277 19.5 14.7501 19.5H9.25013Z"
				fill={color}
			/>
		</Svg>
	);
};

export default BellIcon;
