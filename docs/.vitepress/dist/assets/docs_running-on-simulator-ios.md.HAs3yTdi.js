import{_ as i,c as s,o as a,a4 as e}from"./chunks/framework.nQaBHiNx.js";const v=JSON.parse('{"title":"Executando no Simulador","description":"","frontmatter":{},"headers":[],"relativePath":"docs/running-on-simulator-ios.md","filePath":"docs/running-on-simulator-ios.md"}'),o={name:"docs/running-on-simulator-ios.md"},t=e('<h1 id="executando-no-simulador" tabindex="-1">Executando no Simulador <a class="header-anchor" href="#executando-no-simulador" aria-label="Permalink to &quot;Executando no Simulador&quot;">​</a></h1><h2 id="iniciando-o-simulador" tabindex="-1">Iniciando o simulador <a class="header-anchor" href="#iniciando-o-simulador" aria-label="Permalink to &quot;Iniciando o simulador&quot;">​</a></h2><p>Depois de inicializar seu projeto React Native, você pode executar o seguinte comando dentro do diretório do projeto recém-criado.</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-NEwGZ" id="tab-m-Nsr2p" checked="checked"><label for="tab-m-Nsr2p">npm</label><input type="radio" name="group-NEwGZ" id="tab-Hprqssx"><label for="tab-Hprqssx">yarn</label></div><div class="blocks"><div class="language-bash vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ios</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ios</span></span></code></pre></div></div></div><p>Se tudo estiver configurado corretamente, você deverá ver seu novo aplicativo em execução no Simulador iOS em breve.</p><h2 id="especificando-um-dispositivo" tabindex="-1">Especificando um dispositivo <a class="header-anchor" href="#especificando-um-dispositivo" aria-label="Permalink to &quot;Especificando um dispositivo&quot;">​</a></h2><p>Você pode especificar o dispositivo que o simulador deve executar com o sinalizador <code>--simulator</code>, seguido pelo nome do dispositivo como uma string. O padrão é <code>&quot;iPhone 14&quot;</code>. Se desejar executar seu aplicativo em um iPhone SE (3ª geração), execute o seguinte comando:</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-4dwWy" id="tab-ALxiGIx" checked="checked"><label for="tab-ALxiGIx">npm</label><input type="radio" name="group-4dwWy" id="tab-JkB7nag"><label for="tab-JkB7nag">yarn</label></div><div class="blocks"><div class="language-bash vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ios</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --simulator=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;iPhone SE (3rd generation)&quot;</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ios</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --simulator</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;iPhone SE (3rd generation)&quot;</span></span></code></pre></div></div></div><p>Os nomes dos dispositivos correspondem à lista de dispositivos disponíveis no Xcode. Você pode verificar seus dispositivos disponíveis executando <code>xcrun simctl list devices</code> no console.</p><h3 id="especificando-uma-versao-do-dispositivo" tabindex="-1">Especificando uma versão do dispositivo <a class="header-anchor" href="#especificando-uma-versao-do-dispositivo" aria-label="Permalink to &quot;Especificando uma versão do dispositivo&quot;">​</a></h3><p>Se você tiver várias versões do iOS instaladas, também precisará especificar a versão apropriada. Por exemplo. Para executar seu aplicativo em um iPhone 14 Pro (16.0), execute o seguinte comando:</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-BEJVu" id="tab-_NZ0zxy" checked="checked"><label for="tab-_NZ0zxy">npm</label><input type="radio" name="group-BEJVu" id="tab-zrjQUNU"><label for="tab-zrjQUNU">yarn</label></div><div class="blocks"><div class="language-bash vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ios</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --simulator=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;iPhone 14 Pro (16.0)&quot;</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ios</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --simulator</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;iPhone 14 Pro (16.0)&quot;</span></span></code></pre></div></div></div><h2 id="especificando-um-udid" tabindex="-1">Especificando um UDID <a class="header-anchor" href="#especificando-um-udid" aria-label="Permalink to &quot;Especificando um UDID&quot;">​</a></h2><p>Você pode especificar o UDID do dispositivo retornado do comando <code>xcrun simctl list devices</code>. Por exemplo. Para executar seu aplicativo com UDID <code>AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA</code> execute o seguinte comando:</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-2AO0E" id="tab-_k6l3n6" checked="checked"><label for="tab-_k6l3n6">npm</label><input type="radio" name="group-2AO0E" id="tab-QA7-HTO"><label for="tab-QA7-HTO">yarn</label></div><div class="blocks"><div class="language-bash vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ios</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --udid=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA&quot;</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ios</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --udid</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA&quot;</span></span></code></pre></div></div></div>',15),n=[t];function d(p,l,c,r,h,u){return a(),s("div",null,n)}const g=i(o,[["render",d]]);export{v as __pageData,g as default};