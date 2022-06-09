import { StyleSheet, Dimensions } from "react-native";
import { getStatusBarHeight } from '../../../../config/utilities';


export default StyleSheet.create({
    aaa: {
        paddingHorizontal: 4, 
        backgroundColor: '#fff', 
        alignItems: 'center',
        borderRadius: 20,
        flexDirection: 'row',
        borderWidth: 1,
        justifyContent: 'center',
        flexDirection: 'row',
    },

    aab: { fontSize: 10, paddingRight: 3, color: '#555' },
    aac: { width: 17 },
    aad: {
        alignSelf: 'flex-start',
        backgroundColor: '#eee',
        borderWidth: 0.4,
        borderColor: 'rgba(0, 0, 0, 0.06)',
        borderRadius: 15,
        paddingTop: 12,
        paddingHorizontal: 10,
    },
    aae: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#eee'
    },
    // aaf: { width: 25, height: 25 },
    aag: { paddingBottom: 5 },
    aah: { fontSize: 13, fontWeight: '700' },
    aai: { flexDirection: 'row', alignItems: 'center' },
    aak: { fontSize: 13, color: '#888' },
    aal: { flexDirection: 'row', alignItems: 'center', marginLeft: 4 },
    aam: {
        marginLeft: 2, fontSize: 9,
        // color: '#888'
        color: '#fff'
    },
    aan: { fontSize: 9, color: '#888', marginLeft: 4 },
    aao: { height: 30, alignItems: 'flex-end', flexDirection: 'row', paddingBottom: 3 },
    aap: { fontSize: 10, color: 'rgba(52, 52, 52, 0.41)' },
    aaq: { fontSize: 11, color: 'rgba(52, 52, 52, 0.41)', fontWeight: '600' },
    aau: { flexDirection: 'row', position: 'absolute', paddingHorizontal: 5, bottom: -17, left: -5, },
    aas: { maxWidth: Dimensions.get('window').width * 0.6, paddingLeft: 10 },
    aba: { borderRadius: 5, alignItems: 'flex-end' },
    abb: {
        // borderColor: '#ccc', 
        borderRadius: 7,
        // borderWidth: 1 
    },
    abc: { marginTop: -6, justifyContent: 'center', alignItems: 'center', alignContent: 'flex-end', alignSelf: 'center' },
    abd: { flexDirection: 'row', position: 'absolute', paddingVertical: 2, paddingHorizontal: 5, borderRadius: 10 },
    abe: { fontSize: 11, color: '#fff', fontWeight: '400' },
    abf: { flexDirection: 'row', position: 'absolute', justifyContent: 'flex-start', bottom: -16, left: 0, },
    abg: { zIndex: 2, width: 160, height: 160, marginTop: -25, marginBottom: -24, transform: [{ scale: 0.7 }], marginLeft: -24, },
    abh: { width: 160, height: 160 },
    abi: { fontStyle: 'italic', color: '#007bff' },
    abk: { fontSize: 17, fontWeight: '400', color: '#333' },
    abl: { flexDirection: 'row', width: Dimensions.get('window').width * 0.6, },
    abm: {
        zIndex: 2,
        borderRadius: 8,
        backgroundColor: '#f6f6f6',
        paddingTop: 5,
        paddingBottom: 2,
        paddingHorizontal: 10,
        borderColor: 'rgba(0, 0, 0, 0.06)',
        alignSelf: 'flex-start',
        justifyContent: 'center',
        borderWidth: 1,
    },
    abn: { width: 2.5, borderRadius: 20, backgroundColor: '#00A48D', },
    abo: { flex: 1, paddingLeft: 7, backgroundColor: '#f0f0f0' },
    abp: { width: Dimensions.get('window').width * 0.6 - 10, height: 190, },
    abq: { paddingTop: 5, width: Dimensions.get('window').width * 0.6 },
    abu: { paddingBottom: 2, },
    abs: { fontSize: 13, fontWeight: 'bold', color: "#333" },
    aca: { fontSize: 13, color: "#808080", },
    acb: { paddingTop: 2 },
    acc: { marginTop: 7, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', },
    acd: { flexDirection: 'row', position: 'absolute', justifyContent: 'flex-start', bottom: -16, left: 0, },
    ace: {
        paddingVertical: 8,
        paddingBottom: 20,
        paddingHorizontal: 12,
        paddingRight: 20,
        marginRight: 5,
        backgroundColor: '#f6f6f6',
        flexDirection: 'row',
        borderRadius: 5,
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
        borderWidth: 0.4,
        borderColor: '#ccc',
        alignSelf: 'flex-start',
    },
    acf: { paddingTop: 10, marginRight: 5, },
    acg: { width: 2, backgroundColor: '#00A48D', },
    ach: { paddingVertical: 5 },
    aci: { marginBottom: 2 },
    ack: { marginTop: 2, alignSelf: 'flex-start' },
    acl: { fontSize: 13, color: 'rgba(0, 0, 0, 0.4)', fontStyle: 'italic' },
    acm: { width: 150, height: 150, transform: [{ scale: 0.4 }], marginLeft: -40, marginRight: -50, marginTop: -40, marginBottom: -50, zIndex: 1, },
    acn: { width: 150, height: 150, },
    aco: { borderRadius: 5, alignItems: 'flex-end', paddingVertical: 3, },
    acp: { height: 7 },
    acq: { color: '#fff', fontSize: 14 },
    acu: { width: 35, backgroundColor: '#fff', },
    acs: {
        flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', height: 60, width: 170, borderRadius: 15,
        borderColor: 'tomato', borderWidth: 1, paddingHorizontal: 10,
    },
    acx: { flexDirection: 'row' },
    ada: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: 'tomato', padding: 10, },
    adb: { fontSize: 16, color: '#fff' },
    adc: { flex: 2, alignItems: 'flex-start', padding: 10 },
    add: { fontSize: 11, color: '#000' },
    ade: { flexDirection: 'column' },
    adf: { height: Dimensions.get('window').width / 5, width: Dimensions.get('window').width / 5, marginVertical: 1, marginHorizontal: 1, },
    adg: {
        height: Dimensions.get('window').width / 5,
        width: Dimensions.get('window').width / 5,
        borderRadius: 5,
        borderColor: '#E8E8E8',
        borderWidth: 1,
    },
    adh: { flexDirection: 'row', },
    adi: { flex: 1, flexDirection: 'row', maxWidth: Dimensions.get('window').width * 0.8, },
    adk: { width: 30, marginRight: 10, justifyContent: 'flex-end' },
    adl: { height: 20 },
    // adm: { flex: 1, justifyContent: 'flex-end' },
    adn: { width: 30, height: 30, },
    // ado: { width: 30, height: 30, borderRadius: 20 },
    adp: { width: 30, height: 30, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
    adq: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
    adu: { 
        // flex: 1, 
        alignItems: 'flex-start', maxWidth: Dimensions.get('window').width * 0.75 },
    ads: {
        height: 20,
        // paddingHorizontal: 13,
        justifyContent: 'center',
        alignSelf: 'flex-start',
        marginTop: 10
    },
    aea: {
        backgroundColor: '#f6f6f6',
        borderRadius: 8,
        alignItems: 'flex-end',
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginRight: 5,
        marginTop: 5,
        borderWidth: 0.4,
        borderColor: '#ccc',
    },
    aeb: { fontSize: 14, fontStyle: 'italic', fontWeight: '400', color: '#ccc' },
    aec: { margin: 0 },
    aed: {
        width: Dimensions.get('window').width, height: 50 + getStatusBarHeight(false), backgroundColor: '#000',
        position: 'absolute', top: 0, zIndex: 1, paddingTop: 10 + getStatusBarHeight(false),
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    },
    aee: { alignItems: 'center', paddingHorizontal: 20, paddingVertical: 5 },
    aef: { fontSize: 18, color: '#fff', fontWeight: '500' },
    aeg: { alignItems: 'center', paddingHorizontal: 20, paddingVertical: 5 },
    aeh: {
        width: Dimensions.get('window').width, height: 40 + getStatusBarHeight(false), backgroundColor: '#000',
        position: 'absolute', bottom: 0, zIndex: 1,
    },
    aei: { backgroundColor: '#000' },
    aek: {
        backgroundColor: '#fff', position: 'absolute', bottom: 80, width: 80, justifyContent: 'center', alignItems: 'center',
        borderRadius: 20, paddingVertical: 10, alignSelf: 'center', zIndex: 2,
    },
    ael: { flex: 1 },
    aem: { fontSize: 15, fontWeight: '500', fontStyle: 'italic' }

})