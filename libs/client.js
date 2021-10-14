'use strict';
const ClientBase = require('./clientBase');
const Http = require('./http.js');
/** Client class
 * @param {Object} config
 * - {String} Host
 * - {String} Version
 * - {String} AppId
 * - {String} ServerCode
 * - {String} ClientId
 */
export default class Client extends ClientBase{
  constructor(config) {
    super(config)
    this._host = config.Host
  }
  async common (name, method, params, clientId, token) {
    try {
      let _headers = this.__getSignatureV3(name, method, params, clientId, token)
      let data = await Http({
        host: this._host,
        header: _headers,
        method: method,
        params: params
      })
      return data
    } catch (e) {
      console.log('start Exception', e)
    }
  }
  async HFChannelRequest (obj) {
    const data = this.common('Channel', 'GET', {}, obj.ClientId, '')
    return data
  }
  async HFChannelSheetRequest (obj) {
    const data = this.common('ChannelSheet', 'GET', obj.Params, obj.ClientId, '')
    return data
  }
  async HFSheetMusicRequest (obj) {
    const data = this.common('SheetMusic', 'GET', obj.Params, obj.ClientId, '')
    return data
  }
  async HFSearchMusicRequest (obj) {
    const data = this.common('SearchMusic', 'POST', obj.Params, obj.ClientId, '')
    return data
  }
  async HFMusicConfigRequest (obj) {
    const data = this.common('MusicConfig', 'GET', obj.Params, obj.ClientId, '')
    return data
  }
  async HFBaseLoginRequest (obj) {
    const data = this.common('BaseLogin', 'POST', obj.Params, obj.ClientId, '')
    return data
  }
  async HFBaseReportRequest (obj) {
    const data = this.common('BaseReport', 'POST', obj.Params, obj.ClientId, obj.Token)
    return data
  }
  async HFBaseFavoriteRequest (obj) {
    const data = this.common('BaseFavorite', 'GET', obj.Params, obj.ClientId, obj.Token)
    return data
  }
  async HFBaseHotRequest (obj) {
    const data = this.common('BaseHot', 'GET', obj.Params, obj.ClientId, '')
    return data
  }
  async HFTrafficTrialRequest (obj) {
    const data = this.common('TrafficTrial', 'GET', obj.Params, obj.ClientId, '')
    return data
  }
  async HFTrafficHQListenRequest (obj) {
    const data = this.common('TrafficHQListen', 'GET', obj.Params, obj.ClientId, '')
    return data
  }
  async HFUGCTrialRequest (obj) {
    const data = this.common('UGCTrial', 'GET', obj.Params, obj.ClientId, '')
    return data
  }
  async HFUGCHQListenRequest (obj) {
    const data = this.common('UGCHQListen', 'GET', obj.Params, obj.ClientId, '')
    return data
  }
  async HFKTrialRequest (obj) {
    const data = this.common('KTrial', 'GET', obj.Params, obj.ClientId, '')
    return data
  }
  async HFKHQListenRequest (obj) {
    const data = this.common('KHQListen', 'GET', obj.Params, obj.ClientId, '')
    return data
  }
  async HFOrderTrialRequest (obj) {
    const data = this.common('OrderTrial', 'GET', obj.Params, obj.ClientId, '')
    return data
  }
  async HFOrderMusicRequest (obj) {
    const data = this.common('OrderMusic', 'POST', obj.Params, obj.ClientId, '')
    return data
  }
  async HFOrderDetailRequest (obj) {
    const data = this.common('OrderDetail', 'GET', obj.Params, obj.ClientId, '')
    return data
  }
  async HFOrderAuthorizationRequest (obj) {
    const data = this.common('OrderAuthorization', 'GET', obj.Params, obj.ClientId, '')
    return data
  }
  async HFTrafficReportListenRequest (obj) {
    const data = this.common('TrafficReportListen', 'POST', obj.Params, obj.ClientId, '')
    return data
  }
  async HFUGCReportListenRequest (obj) {
    const data = this.common('UGCReportListen', 'POST', obj.Params, obj.ClientId, '')
    return data
  }
  async HFKReportListenRequest (obj) {
    const data = this.common('KReportListen', 'POST', obj.Params, obj.ClientId, '')
    return data
  }
  async HFOrderPublishRequest (obj) {
    const data = this.common('OrderPublish', 'POST', obj.Params, obj.ClientId, '')
    return data
  }
  async HFAuthorizeMusicRequest (obj) {
    const data = this.common('AuthorizeMusic', 'GET', obj.Params, obj.ClientId, '')
    return data
  }
  async HFCreateMemberSheet (obj) {
    const data = this.common('CreateMemberSheet', 'POST', obj.Params, obj.ClientId, obj.Token)
    return data
  }
  async HFDeleteMemberSheet (obj) {
    const data = this.common('DeleteMemberSheet', 'POST', obj.Params, obj.ClientId, obj.Token)
    return data
  }
  async HFMemberSheet (obj) {
    const data = this.common('MemberSheet', 'GET', obj.Params, obj.ClientId, obj.Token)
    return data
  }
  async HFMemberSheetMusic (obj) {
    const data = this.common('MemberSheetMusic', 'GET', obj.Params, obj.ClientId, obj.Token)
    return data
  }
  async HFAddMemberSheetMusic (obj) {
    const data = this.common('AddMemberSheetMusic', 'POST', obj.Params, obj.ClientId, obj.Token)
    return data
  }
  async HFRemoveMemberSheetMusic (obj) {
    const data = this.common('RemoveMemberSheetMusic', 'POST', obj.Params, obj.ClientId, obj.Token)
    return data
  }
  async HFClearMemberSheetMusic (obj) {
    const data = this.common('ClearMemberSheetMusic', 'POST', obj.Params, obj.ClientId, obj.Token)
    return data
  }
  async HFSearchHistory (obj) {
    const data = this.common('SearchHistory', 'GET', obj.Params, obj.ClientId, obj.Token)
    return data
  }
  async HFClearSearchHistory (obj) {
    const data = this.common('ClearSearchHistory', 'POST', obj.Params, obj.ClientId, obj.Token)
    return data
  }
}