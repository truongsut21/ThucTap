import { WIDTH } from '../controllers/utils';

export function fromTemplateToPosition({ messageCount, position, isPin }) {
    try {
        switch (messageCount) {
            case 1:
                {
                    switch (position) {
                        case 1:
                            {
                                return {
                                    borderWidth: 1,
                                    borderColor: '#ddd',
                                    width: WIDTH * 3 / 4,
                                    borderRadius: 8,
                                }
                            }
                    }

                }
            case 2:
                {
                    switch (position) {
                        case 1:
                            {
                                return {
                                    borderTopLeftRadius: 8,
                                    borderBottomLeftRadius: 8,
                                    borderWidth: 1,
                                    borderColor: '#ddd',
                                    width: WIDTH / 3,

                                }
                            }
                        case 2:
                            {
                                return {
                                    borderWidth: 1,
                                    borderColor: '#ddd',
                                    width: WIDTH / 3,
                                    borderTopRightRadius: 8,
                                    borderBottomRightRadius: 8
                                }
                            }
                    }
                }
            case 3:
                {
                    switch (position) {
                        case 1:
                            {
                                if (isPin) {
                                    return {
                                        borderWidth: 1,
                                        borderColor: '#ddd',
                                        width: WIDTH / 3,
                                        borderBottomLeftRadius: 8,
                                        borderTopLeftRadius: 8,
                                    }
                                }
                                return {
                                    borderWidth: 1,
                                    borderColor: '#ddd',
                                    width: WIDTH / 3,
                                    borderTopLeftRadius: 8,
                                }
                            }
                        case 2:
                            {
                                if (isPin) {
                                    return {
                                        borderWidth: 1,
                                        borderColor: '#ddd',
                                        width: WIDTH / 3,

                                    }
                                }
                                return {
                                    borderWidth: 1,
                                    borderColor: '#ddd',
                                    width: WIDTH / 3,
                                    borderTopRightRadius: 8,
                                }
                            }
                        case 3:
                            {
                                if (isPin) {
                                    return {
                                        borderWidth: 1,
                                        borderColor: '#ddd',
                                        borderTopRightRadius: 8,
                                        borderBottomRightRadius: 8,
                                        width: WIDTH * 8 / 12,
                                    }
                                }
                                return {
                                    borderWidth: 1,
                                    borderColor: '#ddd',
                                    borderBottomLeftRadius: 8,
                                    borderBottomRightRadius: 8,
                                    width: WIDTH * 8 / 12,

                                }
                            }
                    }
                }
            case 4:
                {
                    switch (position) {
                        case 1:
                            {
                                if (isPin) {
                                    return {
                                        borderWidth: 1,
                                        borderColor: '#ddd',
                                        width: WIDTH / 3,
                                        borderBottomLeftRadius: 8,
                                        borderTopLeftRadius: 8,
                                    }
                                }
                                return {
                                    borderWidth: 1,
                                    borderColor: '#ddd',
                                    width: WIDTH / 3,
                                    borderTopLeftRadius: 8
                                }
                            }
                        case 2:
                            {
                                if (isPin) {
                                    return {
                                        borderWidth: 1,
                                        borderColor: '#ddd',
                                        width: WIDTH / 3,
                                    }
                                }
                                return {
                                    borderWidth: 1,
                                    borderColor: '#ddd',
                                    width: WIDTH / 3,
                                    borderTopRightRadius: 8,
                                }
                            }
                        case 3:
                            {
                                if (isPin) {
                                    return {
                                        borderWidth: 1,
                                        borderColor: '#ddd',
                                        width: WIDTH / 3,

                                    }
                                }
                                return {
                                    borderWidth: 1,
                                    borderColor: '#ddd',
                                    width: WIDTH / 3,
                                    borderBottomLeftRadius: 8,
                                }
                            }
                        case 4:
                            {
                                if (isPin) {
                                    return {
                                        borderWidth: 1,
                                        borderColor: '#ddd',
                                        borderTopRightRadius: 8,
                                        borderBottomRightRadius: 8,
                                        width: WIDTH * 8 / 12,
                                    }
                                }
                                return {
                                    borderWidth: 1,
                                    borderColor: '#ddd',
                                    width: WIDTH / 3,
                                    borderBottomRightRadius: 8,
                                }
                            }
                    }
                }
            case 5:
                {
                    switch (position) {
                        case 1:
                            {
                                // return {
                                //     width: WIDTH * 8 / 36,
                                //     borderTopLeftRadius: 8
                                // }
                                if (isPin) {
                                    return {
                                        borderWidth: 1,
                                        borderColor: '#ddd',
                                        width: WIDTH / 3,
                                        borderTopLeftRadius: 8,
                                        borderBottomLeftRadius: 8,
                                    }
                                }
                                return {
                                    borderTopLeftRadius: 8,
                                    borderWidth: 1,
                                    borderColor: '#ddd',
                                    width: WIDTH / 3,

                                }

                            }
                        case 2:
                            {
                                if (isPin) {
                                    return {
                                        borderWidth: 1,
                                        borderColor: '#ddd',
                                        width: WIDTH / 3,
                                    }
                                }
                                return {
                                    borderWidth: 1,
                                    borderColor: '#ddd',
                                    borderTopRightRadius: 8,
                                    width: WIDTH / 3,
                                }
                            }
                        case 3:
                            {
                                return {
                                    borderWidth: 1,
                                    borderColor: '#ddd',
                                    width: WIDTH / 3,
                                }
                            }
                        case 4:
                            {

                                return {
                                    borderWidth: 1,
                                    borderColor: '#ddd',
                                    width: WIDTH / 3,
                                    // borderBottomLeftRadius: 8,
                                }
                            }
                        case 5:
                            {
                                if (isPin) {
                                    return {
                                        borderWidth: 1,
                                        borderColor: '#ddd',
                                        width: WIDTH * 8 / 12,
                                        borderBottomRightRadius: 8,
                                        borderTopRightRadius: 8,
                                    }
                                }
                                return {
                                    borderWidth: 1,
                                    borderColor: '#ddd',
                                    width: WIDTH * 8 / 12,
                                    borderBottomRightRadius: 8,
                                    borderBottomLeftRadius: 8,

                                }
                            }
                    }
                }
            case 6:
                {
                    switch (position) {
                        case 1:
                            {
                                return {
                                    borderWidth: 1,
                                    borderColor: '#ddd',
                                    width: WIDTH * 8 / 36,
                                    borderTopLeftRadius: 8
                                }
                            }
                        case 2:
                            {
                                return {
                                    borderWidth: 1,
                                    borderColor: '#ddd',
                                    width: WIDTH * 8 / 36,
                                }
                            }
                        case 3:
                            {
                                return {
                                    borderWidth: 1,
                                    borderColor: '#ddd',
                                    width: WIDTH * 8 / 36,
                                    borderTopRightRadius: 8,
                                }
                            }
                        case 4:
                            {
                                return {
                                    borderWidth: 1,
                                    borderColor: '#ddd',
                                    width: WIDTH * 8 / 36,
                                    borderBottomLeftRadius: 8,
                                }
                            }
                        case 5:
                            {
                                return {
                                    borderWidth: 1,
                                    borderColor: '#ddd',
                                    width: WIDTH * 8 / 36,
                                }
                            }
                        case 6:
                            {
                                return {
                                    borderWidth: 1,
                                    borderColor: '#ddd',
                                    width: WIDTH * 8 / 36,
                                    borderBottomRightRadius: 8,
                                }
                            }
                    }
                }
            case 7:
                {
                    switch (position) {
                        case 1:
                            {
                                return {
                                    width: WIDTH * 8 / 36,
                                    borderTopLeftRadius: 8
                                }
                            }
                        case 2:
                            {
                                return {
                                    width: WIDTH * 8 / 36,
                                }
                            }
                        case 3:
                            {
                                return {
                                    width: WIDTH * 8 / 36,
                                    borderTopRightRadius: 8,
                                }
                            }
                        case 4:
                            {
                                return {
                                    width: WIDTH * 8 / 36,
                                }
                            }
                        case 5:
                            {
                                return {
                                    width: WIDTH * 8 / 36,
                                }
                            }
                        case 6:
                            {
                                return {
                                    width: WIDTH * 8 / 36,
                                }
                            }
                        case 7:
                            {
                                return {
                                    width: WIDTH * 8 / 12,
                                    borderBottomLeftRadius: 8,
                                    borderBottomRightRadius: 8
                                }
                            }
                    }
                }
            case 8:
                {
                    switch (position) {
                        case 1:
                            {
                                return {
                                    width: WIDTH * 8 / 36,
                                    borderTopLeftRadius: 8
                                }
                            }
                        case 2:
                            {
                                return {
                                    width: WIDTH * 8 / 36,
                                }
                            }
                        case 3:
                            {
                                return {
                                    width: WIDTH * 8 / 36,
                                    borderTopRightRadius: 8,
                                }
                            }
                        case 4:
                            {
                                return {
                                    width: WIDTH * 8 / 36,
                                }
                            }
                        case 5:
                            {
                                return {
                                    width: WIDTH * 8 / 36,
                                }
                            }
                        case 6:
                            {
                                return {
                                    width: WIDTH * 8 / 36,
                                }
                            }
                        case 7:
                            {
                                return {
                                    width: WIDTH / 3,
                                    borderBottomLeftRadius: 8,
                                }
                            }
                        case 8:
                            {
                                return {
                                    width: WIDTH / 3,
                                    borderBottomRightRadius: 8,
                                }
                            }
                    }
                }
            case 9:
                {
                    switch (position) {
                        case 1:
                            {
                                return {
                                    width: WIDTH * 8 / 36,
                                    borderTopLeftRadius: 8
                                }
                            }
                        case 2:
                            {
                                return {
                                    width: WIDTH * 8 / 36,
                                }
                            }
                        case 3:
                            {
                                return {
                                    width: WIDTH * 8 / 36,
                                    borderTopRightRadius: 8,
                                }
                            }
                        case 4:
                            {
                                return {
                                    width: WIDTH * 8 / 36,
                                }
                            }
                        case 5:
                            {
                                return {
                                    width: WIDTH * 8 / 36,
                                }
                            }
                        case 6:
                            {
                                return {
                                    width: WIDTH * 8 / 36,
                                }
                            }
                        case 7:
                            {
                                return {
                                    width: WIDTH * 8 / 36,
                                    borderBottomLeftRadius: 8,
                                }
                            }
                        case 8:
                            {
                                return {
                                    width: WIDTH * 8 / 36,
                                }
                            }
                        case 9:
                            {
                                return {
                                    width: WIDTH * 8 / 36,
                                    borderBottomRightRadius: 8,
                                }
                            }
                    }
                }
        }
    } catch (error) {
        return {}
    }
}