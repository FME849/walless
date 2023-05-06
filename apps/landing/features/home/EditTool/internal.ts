import { FC } from 'react';

export enum ProjectTool {
	name,
	description,
	logo,
	banner,
}

export interface ProjectState {
	name: string;
	description: string;
	logo: string;
	banner: string;
}

export enum DetailTool {}

export type Target = ProjectTool | DetailTool | null;

export interface PreviewProps {
	target: Target;
}

export interface ToolboxProps {
	tools: ToolboxItem[];
	activeTool: ToolboxItem;
	setActiveTool: (tool: ToolboxItem) => void;
	setTarget: (target: Target) => void;
}

export interface ToolboxComponentProps {
	setTarget: (target: Target) => void;
}

export interface ToolboxItem {
	name: string;
	preview: FC<PreviewProps>;
	previewImage: string;
	components: FC<ToolboxComponentProps>[];
}
