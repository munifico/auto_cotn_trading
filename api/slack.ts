import { WebClient } from '@slack/web-api';
import { slackToken } from '../constants/slackConstants';

const web = new WebClient(slackToken);

export function slackSend(msg : string){
    web.chat.postMessage({
        channel : '#coin',
        text : msg
    })
}