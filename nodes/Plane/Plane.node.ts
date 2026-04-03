import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { assetDescription } from './resources/asset';
import { customerDescription } from './resources/customer';
import { customPropertyDescription } from './resources/customProperty';
import { customPropertyOptionDescription } from './resources/customPropertyOption';
import { customPropertyValueDescription } from './resources/customPropertyValue';
import { cycleDescription } from './resources/cycle';
import { epicDescription } from './resources/epic';
import { estimateDescription } from './resources/estimate';
import { initiativeDescription } from './resources/initiative';
import { intakeIssueDescription } from './resources/intakeIssue';
import { labelDescription } from './resources/label';
import { memberDescription } from './resources/member';
import { milestoneDescription } from './resources/milestone';
import { moduleDescription } from './resources/module';
import { pageDescription } from './resources/page';
import { projectDescription } from './resources/project';
import { projectFeatureDescription } from './resources/projectFeature';
import { projectLabelDescription } from './resources/projectLabel';
import { stateDescription } from './resources/state';
import { stickyDescription } from './resources/sticky';
import { teamspaceDescription } from './resources/teamspace';
import { timeTrackingDescription } from './resources/timeTracking';
import { userDescription } from './resources/user';
import { workItemDescription } from './resources/workItem';
import { workItemActivityDescription } from './resources/workItemActivity';
import { workItemAttachmentDescription } from './resources/workItemAttachment';
import { workItemCommentDescription } from './resources/workItemComment';
import { workItemLinkDescription } from './resources/workItemLink';
import { workItemPageLinkDescription } from './resources/workItemPageLink';
import { workItemTypeDescription } from './resources/workItemType';
import { workspaceFeatureDescription } from './resources/workspaceFeature';
import { workspaceInvitationDescription } from './resources/workspaceInvitation';

export class Plane implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Plane',
		name: 'plane',
		icon: 'file:plane.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Plane.so API (projects, work items, cycles, and more)',
		defaults: {
			name: 'Plane',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'planeApi', required: true }],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Asset', value: 'asset' },
					{ name: 'Custom Property', value: 'customProperty' },
					{ name: 'Custom Property Option', value: 'customPropertyOption' },
					{ name: 'Custom Property Value', value: 'customPropertyValue' },
					{ name: 'Customer', value: 'customer' },
					{ name: 'Cycle', value: 'cycle' },
					{ name: 'Epic', value: 'epic' },
					{ name: 'Estimate', value: 'estimate' },
					{ name: 'Initiative', value: 'initiative' },
					{ name: 'Intake Issue', value: 'intakeIssue' },
					{ name: 'Label', value: 'label' },
					{ name: 'Member', value: 'member' },
					{ name: 'Milestone', value: 'milestone' },
					{ name: 'Module', value: 'module' },
					{ name: 'Page', value: 'page' },
					{ name: 'Project', value: 'project' },
					{ name: 'Project Feature', value: 'projectFeature' },
					{ name: 'Project Label (Workspace)', value: 'projectLabel' },
					{ name: 'State', value: 'state' },
					{ name: 'Sticky', value: 'sticky' },
					{ name: 'Teamspace', value: 'teamspace' },
					{ name: 'Time Tracking (Worklog)', value: 'timeTracking' },
					{ name: 'User', value: 'user' },
					{ name: 'Work Item', value: 'workItem' },
					{ name: 'Work Item Activity', value: 'workItemActivity' },
					{ name: 'Work Item Attachment', value: 'workItemAttachment' },
					{ name: 'Work Item Comment', value: 'workItemComment' },
					{ name: 'Work Item Link', value: 'workItemLink' },
					{ name: 'Work Item Page Link', value: 'workItemPageLink' },
					{ name: 'Work Item Type', value: 'workItemType' },
					{ name: 'Workspace Feature', value: 'workspaceFeature' },
					{ name: 'Workspace Invitation', value: 'workspaceInvitation' },
				],
				default: 'workItem',
			},
			...assetDescription,
			...customPropertyDescription,
			...customPropertyOptionDescription,
			...customPropertyValueDescription,
			...customerDescription,
			...cycleDescription,
			...epicDescription,
			...estimateDescription,
			...initiativeDescription,
			...intakeIssueDescription,
			...labelDescription,
			...memberDescription,
			...milestoneDescription,
			...moduleDescription,
			...pageDescription,
			...projectDescription,
			...projectFeatureDescription,
			...projectLabelDescription,
			...stateDescription,
			...stickyDescription,
			...teamspaceDescription,
			...timeTrackingDescription,
			...userDescription,
			...workItemDescription,
			...workItemActivityDescription,
			...workItemAttachmentDescription,
			...workItemCommentDescription,
			...workItemLinkDescription,
			...workItemPageLinkDescription,
			...workItemTypeDescription,
			...workspaceFeatureDescription,
			...workspaceInvitationDescription,
		],
	};
}
