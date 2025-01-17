import { TextStyle, ViewStyle, ImageStyle } from 'react-native';

const TEXT_STYLES: { [key: string]: TextStyle } = {
    base: {
        fontFamily: 'NotoSans',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 14.8,
        letterSpacing: 0.3,
    },
    interactionStat: {
        fontFamily: 'RocGroteskBold',
        fontWeight: 'bold',
        fontSize: 11,
        lineHeight: 0,
        letterSpacing: 0.5,
    },
    captions: {
        color: '#FFF',
        fontFamily: 'NotoSans',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 14.8,
        letterSpacing: 0.5,
    },
    postUsernameText: {
        color: '#FFF',
        fontFamily: "RocGroteskBold",
        fontSize: 15,
        lineHeight: 18,
        letterSpacing: 0.5
    },
    title: {
        color: '#FFF',
        fontFamily: "NotoSans",
        fontWeight: "500",
        fontSize: 16,
        lineHeight: 19.2,
        letterSpacing: 0.3,
    },
    secondaryBase: {
        color: '#FFF',
        fontFamily: 'NotoSans',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 14.8,
        letterSpacing: 0.3,
    },   
    lgButtonText: {
        fontFamily: "NotoSans",
        fontWeight: "400",
        fontSize: 18,
        lineHeight: 24,
        letterSpacing: 0.3
    },
    inputText: {
        fontFamily: "NotoSans",
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19.2,
        letterSpacing: 0.3
    },
    logoText: {
        fontFamily: "RocGroteskBold",
        fontSize: 45,
        lineHeight: 54,
        letterSpacing: 0.5,
    },
    medium: {
        fontFamily: "NotoSans",
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19.2,
        letterSpacing: 0.3,
    },
    onboardingTile: {
        fontFamily: "RocGroteskBold",
        fontSize: 29,
        lineHeight: 49.2,
        letterSpacing: 0.5
    },
    commentUsernameText: {
        fontFamily: "RocGroteskBold",
        fontSize: 13,
        lineHeight: 0,
        letterSpacing: 0.5
    },
    commentUsernameTextMedium: {
        fontFamily: "RocGroteskBold",
        fontSize: 17,
        lineHeight: 0,
        letterSpacing: 0.5
    },
    baseThin: {
        fontFamily: "NotoSans",
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 14.4,
        letterSpacing: 0.3
    }
}

const COLORS = {
        black40: 'rgba(13, 9, 10, 0.4)',
        black20: 'rgba(13, 9, 10, 0.2)',
        white60: 'rgba(234, 242, 239, 0.6)',
        white12: 'rgba(234, 242, 239, 0.12)', 
        white6: 'rgba(234, 242, 239, 0.06)',
        red12: 'rgba(255, 104, 107, 0.12)',
        green28: 'rgba(181, 253, 185, 0.28)',
        suadeShadesWhite: '#EAF2EF',
        suadeShadesBlack: '#0D090A',
        suadeShadesCardOutline: '#EAF2EF33'
    };


type Gradient = {
    start: { x: number; y: number };
    end: { x: number; y: number };
    colors: [string, string, ...string[]];
};  

const GRADIENTS: Record<string, Gradient> = {
    validBlue: {
        start: { x: 0, y: 1 }, 
        end: { x: 1, y: 0 },
        colors: ['#B5EDFD', '#4F74FF'],
    },
    invalidPink: {
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },
        colors: ['#FFA3A5', '#FF4690'],
    },
    journalYellow: {
        start: { x: 0, y: 1 },
        end: { x: 1, y: 0 },
        colors: ['#FFD6A3', '#FFC146'],
    },
    validBlue24: {
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },
        colors: ['rgba(181, 237, 253, 0.24)', 'rgba(79, 116, 255, 0.24)'],
    },
    invalidPink24: {
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },
        colors: ['rgba(255, 163, 165, 0.24)', 'rgba(255, 70, 144, 0.24)'],
    },
    suadeFlowBlue: {
        start: { x: 0, y: 1 },
        end: { x: 1, y: 0 },
        colors: [
            'rgba(181, 237, 253, 0.24)',
            'rgba(130, 177, 254, 0.24)', 
            'rgba(79, 116, 255, 1)',
        ],
    },
    suadeFlowPink: {
        start: { x: 0, y: 1 },
        end: { x: 1, y: 0 },
        colors: [
            'rgba(255, 163, 165, 0)',
            'rgba(255, 117, 154, 1)',
            'rgba(255, 70, 144, 1)',
        ],
    },
    suadeFlowYellow: {
        start: { x: 0, y: 1 },
        end: { x: 1, y: 0 },
        colors: [
            'rgba(255, 214, 163, 1)',
            'rgba(255, 204, 117, 1)',
            'rgba(255, 193, 70, 0)',
        ],
    }
};

const EFFECTS = {
    textShadow: {
        textShadowColor: 'rgba(31, 31, 31, 0.24)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 6,
        shadowSpread: 200,
    },
    iconShadow: {
        shadowColor: '#282828',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 6,
        shadowOpacity: 1,
    },
    quickInteractions: {
        shadowColor: '#1F1F1F',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 6, 
        shadowOpacity: 1,
        backdropFilter: 'blur(24px)',
    },
    largeIconShadow: {
        shadowColor: '#282828',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 32,
        shadowOpacity: 1,
    },
    nextCard: {
        shadowColor: 'rgba(255, 255, 255, 0.4)',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 24,
        shadowOpacity: 1,
        dropShadowColor: '#282828',
        dropShadowOffset: { width: -4.97, height: 4.97 },
        dropShadowRadius: 24.83,
        dropShadowOpacity: 1,
        backdropFilter: 'blur(29.79px)',
    },
    textShadowBody: {
        shadowColor: 'rgba(31, 31, 31, 0.2)',
        shadowOffset: { width: 0, height: 1.5 },
        shadowRadius: 7,
        shadowOpacity: 1,
    },
    standardBlur24: {
        backdropFilter: 'blur(24px)',
    },
    glassy: {
        shadowColor: 'rgba(234, 242, 239, 0.6)',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 8.4,
        shadowOpacity: 1,
    },
    glassySmall: {
        shadowColor: 'rgba(234, 242, 239, 0.32)',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 12,
        shadowOpacity: 1,
    },        
};

export { TEXT_STYLES, COLORS, GRADIENTS, EFFECTS };
  