import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { TouchableOpacity, View } from '@walless/ui';
import { Avatar, IconButton } from '@walless/ui/components';
import { CrossIcon } from '@walless/ui/icons';
import { resources } from 'utils/config';
import { useSnapshot } from 'utils/hook';
import { layoutProxy } from 'utils/state/layout';

interface Props {
	children?: ReactNode;
	contentContainerClass?: string;
}

export const DashboardLayout: FC<Props> = ({
	children,
	contentContainerClass = 'flex-1',
}) => {
	const navigate = useNavigate();
	const onExplorePress = () => navigate('/explore');
	const onAvatarPress = () => navigate('/profile');
	const layouts = useSnapshot(layoutProxy);
	const layoutKeys = Object.keys(layouts);

	return (
		<View className="flex-1 flex-row">
			<View className="w-[50px] bg-color-7 px-1">
				<View className="flex-1 items-center py-4 gap-2">
					{layoutKeys.map((key) => (
						<IconButton
							key={key}
							size={36}
							source={resources.icons.solana}
							className="rounded-lg overflow-hidden"
							onPress={() => navigate(`/layouts/${key}`)}
						/>
					))}
					<TouchableOpacity
						className="w-9 aspect-square border border-[color:#3B6887] rounded-lg justify-center items-center"
						onPress={onExplorePress}
					>
						<CrossIcon size={15} color="#3B6887" />
					</TouchableOpacity>
				</View>
				<View className="justify-end items-center pb-5">
					<TouchableOpacity
						className="w-9 aspect-square"
						onPress={onAvatarPress}
					>
						<Avatar />
					</TouchableOpacity>
				</View>
			</View>
			<View className={contentContainerClass}>{children}</View>
		</View>
	);
};

export default DashboardLayout;
