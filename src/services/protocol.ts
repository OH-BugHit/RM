import { BuiltinEvent, PeerEvent } from '@genai-fi/base';
import { GroupType, Level, RegisterData, RewardConfig, ScoreData, Username } from '../types';
import { AgentData, LevelData } from '../utils/types';

export interface ConfigurationEvent extends PeerEvent {
    event: 'eter:config';
    configuration: RewardConfig;
}

export interface ScoreEvent extends PeerEvent {
    event: 'eter:score';
    data: ScoreData;
}

export interface RegisterEvent extends PeerEvent {
    event: 'eter:register';
    data: RegisterData;
}

export interface CloseEvent extends PeerEvent {
    event: 'eter:drop';
    data: Username;
}

export interface UserListEvent extends PeerEvent {
    event: 'eter:userlist';
    available: Username[];
    taken: Username[];
}

export interface LevelRequestEvent extends PeerEvent {
    event: 'eter:modelRequest';
}

export interface LevelTransferEvent extends PeerEvent {
    event: 'eter:levelTransfer';
    data: Level;
}

export interface MessageUserEvent extends PeerEvent {
    event: 'eter:messageUser';
    message: string;
    reload: boolean;
    action: 'bouncer';
    recipient?: Username;
}

export interface ProfilePictureEvent extends PeerEvent {
    event: 'eter:profileColour';
    data: RegisterData;
}

export interface HeartbeatEvent extends PeerEvent {
    event: 'eter:alive';
    user: Username;
}

export interface LevelGroupEvent extends PeerEvent {
    event: 'eter:levelGroup';
    data: GroupType[];
}

export interface EnvironmentTransferEvent extends PeerEvent {
    event: 'eter:envTransfer';
    data: LevelData;
}

export interface AgentTransferEvent extends PeerEvent {
    event: 'agentTransfer';
    data: AgentData;
}

export type EventProtocol =
    | AgentTransferEvent
    | EnvironmentTransferEvent
    | LevelGroupEvent
    | BuiltinEvent
    | ConfigurationEvent
    | ScoreEvent
    | RegisterEvent
    | CloseEvent
    | UserListEvent
    | LevelRequestEvent
    | LevelTransferEvent
    | MessageUserEvent
    | ProfilePictureEvent
    | HeartbeatEvent;
