import { useCallback, useRef, useState } from 'react';
import { Button, Input, Stack, Text } from '@walless/ui';
import { toPng } from 'html-to-image';

import { handleChangeImage } from '../internal';

import LayoutCard from './LayoutCard';

export interface LayoutCardProps {
	coverImage: string;
	avatar: string;
	projectName: string;
	description: string;
}

export const initialLayoutCardProps: LayoutCardProps = {
	coverImage: 'https://picsum.photos/200/300',
	avatar: 'https://picsum.photos/200/300',
	projectName: 'Project Name',
	description:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.',
};

export enum LayoutCardComponent {
	coverImage,
	avatar,
	projectName,
	description,
}

const LayoutInStore = () => {
	const [activeComponent, setActiveComponent] =
		useState<LayoutCardComponent | null>(null);
	const [layoutCardProps, setLayoutCardProps] = useState<LayoutCardProps>(
		initialLayoutCardProps,
	);
	const wrapperRef = useRef(null);

	const handleMouseEnter = (index: number) => {
		setActiveComponent(index);
	};

	const handleMouseLeave = () => {
		setActiveComponent(null);
	};

	const handleChangeCoverImage = (url: string) => {
		setLayoutCardProps({
			...layoutCardProps,
			coverImage: url,
		});
	};

	const handleChangeAvatar = (url: string) => {
		setLayoutCardProps({
			...layoutCardProps,
			avatar: url,
		});
	};

	const handleExportImage = useCallback(() => {
		if (wrapperRef.current === null) {
			return;
		}

		toPng(wrapperRef.current, { cacheBust: true })
			.then((dataUrl) => {
				const link = document.createElement('a');
				link.download = 'walless-custom-layout-card.png';
				link.href = dataUrl;
				link.click();
			})
			.catch((err) => {
				console.error(err);
			});
	}, [wrapperRef]);

	return (
		<Stack
			gap={24}
			$gtMd={{
				flexDirection: 'row',
			}}
		>
			<Stack gap={12}>
				<Stack
					flexDirection="row"
					gap={16}
					onMouseEnter={() => handleMouseEnter(LayoutCardComponent.coverImage)}
					onMouseLeave={handleMouseLeave}
				>
					<Text>Set cover image (png, jpg, jpeg)</Text>
					<input
						type="file"
						accept="image/png, image/jpg, image/jpeg"
						onChange={(e) => handleChangeImage(e, handleChangeCoverImage)}
					/>
				</Stack>

				<Stack
					flexDirection="row"
					gap={16}
					onMouseEnter={() => handleMouseEnter(LayoutCardComponent.avatar)}
					onMouseLeave={handleMouseLeave}
				>
					<Text>Set avatar</Text>
					<input
						type="file"
						accept="image/png, image/jpeg"
						onChange={(e) => handleChangeImage(e, handleChangeAvatar)}
					/>
				</Stack>

				<Stack
					flexDirection="row"
					gap={16}
					onMouseEnter={() => handleMouseEnter(LayoutCardComponent.projectName)}
					onMouseLeave={handleMouseLeave}
				>
					<Text>Set project name</Text>
					<Input
						onChangeText={(text) =>
							setLayoutCardProps({
								...layoutCardProps,
								projectName: text,
							})
						}
					/>
				</Stack>

				<Stack
					flexDirection="row"
					gap={16}
					onMouseEnter={() => handleMouseEnter(LayoutCardComponent.description)}
					onMouseLeave={handleMouseLeave}
				>
					<Text>Set description</Text>
					<Input
						onChangeText={(text) =>
							setLayoutCardProps({
								...layoutCardProps,
								description: text,
							})
						}
					/>
				</Stack>
			</Stack>

			<Stack alignItems="center" gap={24}>
				<Stack ref={wrapperRef}>
					<LayoutCard
						item={layoutCardProps}
						activeComponent={activeComponent}
					/>
				</Stack>

				<Button width={160} height={40} onPress={handleExportImage}>
					<Text>Save as Image</Text>
				</Button>
			</Stack>
		</Stack>
	);
};

export default LayoutInStore;
