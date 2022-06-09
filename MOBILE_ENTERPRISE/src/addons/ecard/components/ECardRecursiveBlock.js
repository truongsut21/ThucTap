import React, { useMemo, lazy, Suspense } from 'react';
import { View, Text } from 'react-native';
import { SvgUri } from 'react-native-svg';
import Ionicons from "react-native-vector-icons/Ionicons";

const ECardRecursiveBlock = ({ block }) => {

    const renderSubBlocks = useMemo(() => {
        if (block.subBlocks) {
            return block.subBlocks.map(sb => {
                return <ECardRecursiveBlock key={sb.key} block={sb} />
            })
        }
        return null;
    }, [block.subBlocks]);

    const IconComp = useMemo(() => {
        if (block.tag === 'VectorIcon') {
            if (block.content.icon === 'Ionicons') {
                return Ionicons;
            }
            return null;
        }
        return null;
    }, [block]);


    try {

        if (block.tag === 'View') {
            return <View style={block.style || {}}>
                {renderSubBlocks}
            </View>
        } else if (block.tag === 'Text') {
            return <Text style={block.style || {}}>
                {block.content ? block.content : ''}
                {renderSubBlocks}
            </Text>
        } else if (block.tag === 'SVGImage') {
            return <View style={block.style || {}}>
                <Suspense fallback={<View></View>}>
                    <SVGFile
                        color={'#ddd'}
                        fill="#ddd"
                        fillRule={'evenodd'}
                        style={{ color: '#ddd' }}
                    />
                </Suspense>
                {renderSubBlocks}
            </View>
        } else if (block.tag === 'SVGUri') {
            return <View style={block.style || {}}>
                <SvgUri
                    uri={block.content}
                    width="100%"
                    height="100%"
                />
                {renderSubBlocks}
            </View>
        } else if (block.tag === 'VectorIcon') {
            return <React.Fragment>
                <IconComp name={block.content.name} size={block.content.size} />
                {renderSubBlocks}
            </React.Fragment>
        }
        { renderSubBlocks }
    } catch (error) {
        return null;
    }
}

export default ECardRecursiveBlock;