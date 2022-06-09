import { StyleSheet, Platform, Dimensions } from 'react-native';

export default StyleSheet.create({
    // SignIn.js
    aa: {
        flex: 0,
        backgroundColor: '#00A48D'
    },
    ab: {
        flex: 1,
        backgroundColor: '#fff'
    },
    ac: {
        flex: 1,
        padding: 20,
        justifyContent: 'center'
    },
    ad: {
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ae: {
        width: 150,
        height: 150
    },
    af: {
        height: 45,
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    ag: {
        flex: 1,
        backgroundColor: '#f3f3f3',
        borderRadius: 5,
        color: '#333',
        // justifyContent: 'center',
        // alignItems: 'center',
        // textAlignVertical: 'center',
        paddingVertical: Platform.OS === 'android' ? 7 : 12,
        paddingHorizontal: 20,
    },
    // ah: {
    //     height: 5
    // },
    ai: {
        height: 45,
        borderRadius: 25,
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    aj: {
        flex: 1,
        backgroundColor: '#f3f3f3',
        borderRadius: 5,
        color: '#333',
        paddingVertical: Platform.OS === 'android' ? 7 : 12,
        paddingHorizontal: 20,
    },
    ak: {
        height: 15
    },
    al: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    am: {
        height: 40,
        width: 150,
        backgroundColor: '#00A48D',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    an: {
        fontSize: 16,
        color: '#fff'
    },
    ao: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    ap: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',

    },
    aq: {
        fontSize: 13,
        fontWeight: '500',
        color: '#737373'
    },
    // ar: {
    //     padding: 10
    // },
    as: {
        // height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    at: {
        fontSize: 14,
        fontWeight: '500',
        color: '#737373'
    },
    au: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    av: {
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center'
    },
    aw: {
        padding: 20
    },
    ax: {
        fontSize: 15,
        color: 'red'
    },
    ay: {
        fontSize: 17,
        fontWeight: '600'
    },
    // SignUp.js
    az: {
        flex: 0,
        backgroundColor: '#fff'
    },
    ba: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    bb: {
        minHeight: 70,
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bc: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    bd: {
        fontSize: 16,
        color: '#555',
        fontWeight: 'bold',


    },
    be: {
        flex: 1,
        justifyContent: 'center'
    },
    bf: {
        paddingHorizontal: 20
    },
    bg: {
        height: 60,
        justifyContent: 'center',
    },
    bh: {

        position: 'absolute',
        top: -8,
        left: 20,
        backgroundColor: '#fff',
        paddingVertical: 1,
        paddingHorizontal: 15,
        zIndex: 1,

    },
    bi: {
        fontSize: 14,
        color: '#00A48D',
        // backgroundColor:'#f1f',
        paddingTop: 10,

    },
    bj: {
        borderWidth: 1,
        borderColor: '#BBB',
        borderRadius: 20,
        backgroundColor: '#fff',
        height: 50,
        width: "96%",
        padding: 4,
    },
    bk: {
        paddingVertical: Platform.OS === 'android' ? 10 : 15,
        paddingHorizontal: 15,
        color: '#333',
        // backgroundColor:"pink",
        padding: 4,
        width: "100%",

        position: 'absolute',
        TOP: 0,

    },
    bl: {
        height: 15
    },
    bm: {
        alignSelf: 'flex-start',
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    bn: {
        paddingRight: 6
    },
    bo: {
        paddingVertical: 10
    },
    bp: {
        fontSize: 14,
        color: '#555'
    },
    bq: {
        // backgroundColor:"#ccc"
    },
    br: {
        width: "100%",
        minHeight: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 20
    },
    bs: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    bt: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    bu: {
        margin: 0
    },
    bv: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bw: {
        minHeight: 100,
        maxWidth: Dimensions.get('window').width / 10 * 7,
        backgroundColor: '#fff',
        borderRadius: 13,
    },
    bx: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderBottomWidth: 1,
        borderColor: '#eee'
    },
    by: {
        color: '#333',
        fontWeight: Platform.OS === 'android' ? 'bold' : '600'
    },
    bz: {
        fontSize: 12
    },
    ca: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0
    },
    cb: {
        color: '#00A48D',
        fontWeight: Platform.OS === 'android' ? 'bold' : '500'
    },
    cc: {
        margin: 0
    },
    cd: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ce: {
        minHeight: 100,
        minWidth: 200,
        maxWidth: Dimensions.get('window').width / 10 * 7,
        backgroundColor: '#fff',
        borderRadius: 13,
    },
    cf: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderBottomWidth: 1,
        borderColor: '#eee'
    },
    cg: {
        color: '#333',
        fontWeight: Platform.OS === 'android' ? 'bold' : '600',
        fontSize: 15
    },
    ch: {
        fontSize: 12
    },
    ci: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0
    },
    cj: {
        color: '#00A48D',
        fontWeight: Platform.OS === 'android' ? 'bold' : '500'
    },
    ck: {

    },
    cl: {

    },
    cm: {

    },
    cn: {

    },
    co: {

    },
    cp: {

    },
    cq: {

    },
    cr: {

    },
    cs: {

    },
    ct: {

    },
    cu: {

    },
    cv: {

    },
    cw: {

    },
    cx: {

    },
    cy: {

    },
    cz: {

    },
    da: {

    },
    db: {

    },
    dc: {

    },
    dd: {

    },
    de: {

    },
    df: {

    },
    dg: {

    },
    dh: {

    },
    di: {

    },
    dj: {

    },
    dk: {

    },
    dl: {

    },
    dm: {

    },
    dn: {

    },
    do: {

    },
    dp: {

    },
    dq: {

    },
    dr: {

    },
    ds: {

    },
    dt: {

    },
    du: {

    },
    dv: {

    },
    dw: {

    },
    dx: {

    },
    dy: {

    },
    dz: {

    },
    ea: {

    },
    eb: {

    },
    ec: {

    },
    ed: {

    },
    ee: {

    },
    ef: {

    },
    eg: {

    },
    eh: {

    },
    ei: {

    },
    ej: {

    },
    ek: {

    },
    el: {

    },
    em: {

    },
    en: {

    },
    eo: {

    },
    ep: {

    },
    eq: {

    },
    er: {

    },
    es: {

    },
    et: {

    },
    eu: {

    },
    ev: {

    },
    ew: {

    },
    ex: {

    },
    ey: {

    },
    ez: {

    },
})