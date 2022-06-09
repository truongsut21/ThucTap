import React from 'react';
import { } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import isEqual from 'react-fast-compare';
import OtherTextContent from '../childOtherMessage/TextContent';
import OtherStickerContent from '../childOtherMessage/StickerContent';
import OtherFileContent from '../childOtherMessage/FileContent';
import OtherImageContent from '../childOtherMessage/ImageContent';
import OtherImageGroupContent from '../childOtherMessage/ImageGroupContent'
// import OtherTaskContent from '../childOtherMessage/TaskContent';
// import OtherParentMessage from '../childOtherMessage/ParentMessage';
// import OtherVideoContent from '../childOtherMessage/VideoContent';
import OwnTextContent from '../childOwnMessage/TextContent';
import OwnStickerContent from '../childOwnMessage/StickerContent';
import OwnFileContent from '../childOwnMessage/FileContent';
import OwnImageContent from '../childOwnMessage/ImageContent';
import OwnImageGroupContent from '../childOwnMessage/ImageGroupContent';
import OwnContactContent from '../childOwnMessage/ContactContent';
import OtherContactContent from '../childOtherMessage/ContactContent';

const MessageSwitcher = ({ ...props }) => {
    const dispatch = useDispatch()
    const myUserId = useSelector(state => state.AuthStoredReducer.myUserInfo._id);
    const { is_removed, create_uid, type } = useSelector(state => {
        const message = state.ChatStoredReducer.fullMessages[props._id];


        if (message) {
            return {
                is_removed: message.is_removed,
                create_uid: message.create_uid,
                type: message.type,
            }
        }
        return {}

    }, (prev, next) => isEqual(prev, next));

    try {
        if (create_uid === myUserId) {
            if (is_removed) {
                return <OwnTextContent {...props} />
            }
            switch (type) {
                case 'text':
                    return <OwnTextContent {...props} />
                case 'sticker':
                    return <OwnStickerContent {...props} />
                case 'image':
                    return <OwnImageContent {...props} />
                case 'image_group':
                    return <OwnImageGroupContent {...props} />
                case 'file':
                    return <OwnFileContent {...props} />
                case 'contact':
                    return <OwnContactContent {...props} />

                default:
                    return null;
            }
        }


        if (is_removed) {
            return <OtherTextContent {...props} />
        }
        switch (type) {
            case 'text':
                return <OtherTextContent {...props} />
            case 'sticker':
                return <OtherStickerContent {...props} />
            case 'image':
                return <OtherImageContent {...props} />
            case 'image_group':
                return <OtherImageGroupContent {...props} />
            case 'file':
                return <OtherFileContent {...props} />
            case 'contact':
                return <OtherContactContent {...props} />
            default:
                return null;
        }
    } catch (error) {
        return null;
    }
}

export default React.memo(MessageSwitcher, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
})