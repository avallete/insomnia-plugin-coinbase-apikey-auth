import {createHmac} from "crypto";

type RequestContext = {
    getId (): string,
    getName (): string,
    getUrl (): string,
    setUrl (url: string): void,
    getMethod (): string,
    getHeader (name: string): string | null,
    hasHeader (name: string): boolean,
    removeHeader (name: string): void,
    setHeader (name: string, value: string): void,
    addHeader (name: string, value: string): void,
    getParameter (name: string): string | null,
    getParameters (): Array<{name: string, value: string}>,
    setParameter (name: string, value: string): void,
    hasParameter (name: string): boolean,
    addParameter (name: string, value: string): void,
    removeParameter (name: string): void,
    setBody (text: string): void,
    getBody (): Record<string, unknown>,
    setCookie (name: string, value: string): void,
    getEnvironmentVariable (name: string): string,
    getEnvironment (): Record<string, unknown>,
    setAuthenticationParameter (string: string): void,
    getAuthentication (): Record<string, unknown>,
    settingSendCookies (enabled: boolean): void,
    settingStoreCookies (enabled: boolean): void,
    settingEncodeUrl (enabled: boolean): void,
    settingDisableRenderRequestBody (enabled: boolean): void,
};

function unixTimestamp(): number {
    return Math.floor(new Date().getTime() / 1000);
}

function getPathUrl(string_url: string): string {
    return new URL(string_url).pathname;
}

function JSONStringifyIfNotEmpty(obj: Record<string, unknown>) {
    const json_string: string = JSON.stringify(obj);
    if (json_string === "{}") {
        return "";
    }
    return json_string;
}

function coinbaseApikeyAuthRequestHook(context: { request: RequestContext }) {
    console.log('coinbase-apikey-auth plugin executing ...')
    const apiKey: string = context.request.getEnvironmentVariable('COINBASE_API_KEY');
    const secretKey: string = context.request.getEnvironmentVariable('COINBASE_SECRET_KEY');
    const timestamp: number = unixTimestamp();
    const requestMethod = context.request.getMethod().toUpperCase();
    const requestUrl = context.request.getUrl();
    // We have to use an empty string if the body is an empty json object
    const body: string = JSONStringifyIfNotEmpty(context.request.getBody());

    if (!apiKey || !secretKey) {
        throw Error('COINBASE_API_KEY or COINBASE_SECRET_KEY variable is missing from the environment.');
    } else {
        const message = `${timestamp}${requestMethod}${getPathUrl(requestUrl)}${body}`;
        const cb_access_sign: string = createHmac('sha256', secretKey)
            .update(message)
            .digest('hex');
        context.request.setHeader('CB-ACCESS-SIGN', cb_access_sign);
        console.log(`[header] Set CB-ACCESS-SIGN header: ${cb_access_sign}`);
        context.request.setHeader('CB-ACCESS-TIMESTAMP', `${timestamp}`);
        console.log(`[header] Set CB-ACCESS-TIMESTAMP header: ${timestamp}`);
        context.request.setHeader('CB-ACCESS-KEY', apiKey);
        console.log(`[header] Set CB-ACCESS-KEY header: ${apiKey}`);
    }
}

module.exports = coinbaseApikeyAuthRequestHook;