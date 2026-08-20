import { Clusters, HUDvisibility, HUDvisibilityField, UiControlsField } from '../../../types';
import { UiControls } from '../../../utils/types';

export const buildUiConf = (config: UiControlsField[]): UiControls & Clusters => {
    const fields = new Set(config);

    const buildC = {
        create: fields.has('buildC.create'),
        tools: fields.has('buildC.tools'),
        settings: fields.has('buildC.settings'),
    };

    const inspectC = {
        qMap: fields.has('inspectC.qMap'),
        agentVision: fields.has('inspectC.agentVision'),
        charts: fields.has('inspectC.charts'),
    };

    const rewardC = {
        step: fields.has('rewardC.step'),
        time: fields.has('rewardC.time'),
        props: fields.has('rewardC.props'),
    };

    const agentC = {
        img: fields.has('agentC.img'),
        obs: fields.has('agentC.obs'),
        prm: fields.has('agentC.prm'),
        trash: fields.has('agentC.trash'),
    };

    return {
        buildC,
        inspectC,
        rewardC,
        agentC,

        agent: Object.values(agentC).some(Boolean),
        inspect: Object.values(inspectC).some(Boolean),
        reward: Object.values(rewardC).some(Boolean),
        build: Object.values(buildC).some(Boolean),
    };
};

export const buildHudVisibility = (config: HUDvisibilityField[]): HUDvisibility => {
    const fields = new Set(config);

    return {
        text: fields.has('text'),
        charts: fields.has('charts'),
        agentVision: fields.has('agentVision'),
        qTable: fields.has('qTable'),
        cableLeft: fields.has('cableLeft'),
        cableRight: fields.has('cableRight'),
        gameBar: fields.has('gameBar'),
        gameBarContent: {
            score: fields.has('gameBarContent.score'),
            picked: fields.has('gameBarContent.picked'),
        },
        controlBar: fields.has('controlBar'),

        controls: {
            play: fields.has('controls.play'),
            ff: fields.has('controls.ff'),
            step: fields.has('controls.step'),
            inspect: fields.has('controls.inspect'),
        },

        alpha: fields.has('alpha'),
        gamma: fields.has('gamma'),
        epsilon: fields.has('epsilon'),
        progress: fields.has('progress'),

        rewardCluster: fields.has('rewardCluster'),
        agentCluster: fields.has('agentCluster'),
        inspectCluster: fields.has('inspectCluster'),
        buildCluster: fields.has('buildCluster'),

        build: {
            create: fields.has('build.create'),
            tools: fields.has('build.tools'),
            settings: fields.has('build.settings'),
        },

        inspect: {
            qMap: fields.has('inspect.qMap'),
            agentVision: fields.has('inspect.agentVision'),
            charts: fields.has('inspect.charts'),
        },

        reward: {
            step: fields.has('reward.step'),
            time: fields.has('reward.time'),
            props: fields.has('reward.props'),
        },

        agent: {
            img: fields.has('agent.img'),
            obs: fields.has('agent.obs'),
            prm: fields.has('agent.prm'),
            trash: fields.has('agent.trash'),
        },
    };
};
