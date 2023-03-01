import { FC } from 'react';
import { Text, View } from '@walless/ui';

import { FeatureButtonProps } from '.';

const FeatureButton: FC<FeatureButtonProps> = ({ icon, title, onPress }) => {
	return (
		<View
			className="bg-[#EFEFEF] w-fit px-3 py-2 flex flex-row gap-[2px] justify-center items-center"
			onTouchEnd={onPress}
		>
			{icon}
			<Text className="text-xs text-[#000000CC]">{title}</Text>
		</View>
	);
};

export default FeatureButton;
