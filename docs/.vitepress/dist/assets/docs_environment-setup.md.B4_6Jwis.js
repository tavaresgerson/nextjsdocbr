import{_ as e,c as a,o,a4 as i}from"./chunks/framework.nQaBHiNx.js";const v=JSON.parse('{"title":"Configurando o ambiente de desenvolvimento","description":"","frontmatter":{},"headers":[],"relativePath":"docs/environment-setup.md","filePath":"docs/environment-setup.md"}'),s={name:"docs/environment-setup.md"},t=i(`<h1 id="configurando-o-ambiente-de-desenvolvimento" tabindex="-1">Configurando o ambiente de desenvolvimento <a class="header-anchor" href="#configurando-o-ambiente-de-desenvolvimento" aria-label="Permalink to &quot;Configurando o ambiente de desenvolvimento&quot;">​</a></h1><p>Esta página te ajudará a instalar e construir seu primeiro aplicativo React Native.</p><p><strong>Se você é novo no desenvolvimento móvel</strong>, a maneira mais fácil de começar é com o Expo Go. Expo é um conjunto de ferramentas e serviços construídos em torno do React Native e, embora tenha <a href="https://docs.expo.dev/" target="_blank" rel="noreferrer">muitos recursos</a>, o recurso mais relevante para nós no momento é que você pode escrever um aplicativo React Native em minutos. Você só precisará de uma versão recente do Node.js e de um telefone ou emulador. Se quiser experimentar o React Native diretamente em seu navegador antes de instalar qualquer ferramenta, você pode experimentar o <a href="https://snack.expo.dev/" target="_blank" rel="noreferrer">Snack</a>.</p><p><strong>Se você já está familiarizado com o desenvolvimento móvel</strong>, você pode querer usar o React Native CLI. Requer Xcode ou Android Studio para começar. Se você já tiver uma dessas ferramentas instalada, poderá colocá-la em funcionamento em alguns minutos. Se eles não estiverem instalados, você deverá gastar cerca de uma hora instalando-os e configurando-os.</p><h2 id="expo-go-inicio-rapido" tabindex="-1">Expo Go Início Rápido <a class="header-anchor" href="#expo-go-inicio-rapido" aria-label="Permalink to &quot;Expo Go Início Rápido&quot;">​</a></h2><p>Execute o seguinte comando para criar um novo projeto React Native chamado &quot;AwesomeProject&quot;:</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-H1sB7" id="tab-T_61j_9" checked="checked"><label for="tab-T_61j_9">npm</label><input type="radio" name="group-H1sB7" id="tab--lNbW7D"><label for="tab--lNbW7D">yarn</label></div><div class="blocks"><div class="language-bash vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npx</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> create-expo-app</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> AwesomeProject</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> AwesomeProject</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npx</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> expo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> create</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> expo-app</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> AwesomeProject</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> AwesomeProject</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> expo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span></span></code></pre></div></div></div><p>Isso iniciará um servidor de desenvolvimento para você.</p><h3 id="executando-seu-aplicativo-react-native" tabindex="-1">Executando seu aplicativo React Native <a class="header-anchor" href="#executando-seu-aplicativo-react-native" aria-label="Permalink to &quot;Executando seu aplicativo React Native&quot;">​</a></h3><p>Instale o aplicativo <a href="https://expo.dev/client" target="_blank" rel="noreferrer">Expo Go</a> em seu telefone iOS ou Android e conecte-se à mesma rede sem fio do seu computador. No Android, use o aplicativo Expo Go para escanear o código QR do seu terminal para abrir seu projeto. No iOS, use o leitor de código QR integrado do aplicativo iOS Camera padrão.</p><h2 id="react-native-cli-inicio-rapido" tabindex="-1">React Native CLI Início Rápido <a class="header-anchor" href="#react-native-cli-inicio-rapido" aria-label="Permalink to &quot;React Native CLI Início Rápido&quot;">​</a></h2><p>Siga estas instruções se precisar criar código nativo em seu projeto. Por exemplo, se você estiver integrando o React Native em um aplicativo existente ou se executou o &quot;prebuild&quot; do Expo para gerar o código nativo do seu projeto, você precisará desta seção.</p><p>As instruções são um pouco diferentes dependendo do seu sistema operacional de desenvolvimento e se você deseja começar a desenvolver para iOS ou Android. Se você deseja desenvolver para Android e iOS, tudo bem - você pode escolher um para começar, já que a configuração é um pouco diferente.</p><h3 id="macos" tabindex="-1">macOS <a class="header-anchor" href="#macos" aria-label="Permalink to &quot;macOS&quot;">​</a></h3><ul><li><a href="/docs/environment-setup/mac-os/android.html">Android</a></li><li><a href="/docs/environment-setup/mac-os/ios.html">iOS</a></li></ul><h3 id="windows" tabindex="-1">Windows <a class="header-anchor" href="#windows" aria-label="Permalink to &quot;Windows&quot;">​</a></h3><ul><li><a href="/docs/environment-setup/windows/android.html">Android</a></li><li>iOS <em>(Não compatível)</em></li></ul><h3 id="linux" tabindex="-1">Linux <a class="header-anchor" href="#linux" aria-label="Permalink to &quot;Linux&quot;">​</a></h3><ul><li><a href="/docs/environment-setup/linux/android.html">Android</a></li><li>iOS <em>(Não compatível)</em></li></ul>`,19),n=[t];function r(d,l,c,p,u,h){return o(),a("div",null,n)}const k=e(s,[["render",r]]);export{v as __pageData,k as default};
