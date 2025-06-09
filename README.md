# MindAR

<img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/multi-targets-demo-8b5fc868f6b0847a9818e8bf0ba2c1c3.gif" height="250"><img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/interactive-demo-1ab348a381cbd808f4d52c8750524d11.gif" height="250"><img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/face-tryon-demo-369c4ba701f1df2099ecf05c27f0c944.gif" height="250">

MindAR 是一个网页增强现实库。主要特色包括：

:star: 支持图像跟踪和面部跟踪。如需位置跟踪或标记跟踪，请查看 [AR.js](https://github.com/AR-js-org/AR.js)

:star: 完全使用 JavaScript 编写，从底层计算机视觉引擎到前端的端到端解决方案

:star: 利用 GPU（通过 WebGL）和 Web Worker 实现高性能

:star: 开发者友好。易于设置。通过 AFRAME 扩展，您只需10行代码即可创建应用

## 🦝 浣熊面部跟踪演示

本项目还包含一个完全本地化的浣熊面部跟踪演示，展示了 MindAR 的面部跟踪功能：

### 📂 演示结构
```
Raccoon/
├── index.html              # 多版本选择主页面
├── index-pure-local.html   # 🎯 纯本地源码版（推荐）
├── index-hybrid.html       # 🔄 混合版（CDN库+本地模型）
├── index-local.html        # 📦 本地优化版
├── index-stable.html       # 🔒 稳定兼容版
├── assets/
│   └── raccoon_head.glb   # 浣熊3D模型 (8.8MB)
└── libs/
    └── three/             # 本地Three.js库文件
```

### 🚀 演示运行方法

**使用项目开发服务器：**
```bash
npm run dev
```
然后访问：`https://localhost:5173/Raccoon/`

### 🎮 演示功能特性

- 🎯 **实时面部跟踪**：检测468个面部关键点
- 😊 **表情同步**：浣熊会同步你的面部表情  
- 📹 **镜像视频**：显示实时摄像头画面
- 🔄 **完全离线**：无需网络连接（纯本地版）
- ⚡ **GPU加速**：WebGL渲染和MediaPipe推理
- 🎨 **多版本兼容**：4种不同配置确保最大兼容性

# 资金筹集

MindAR 是唯一一个积极维护的网页AR SDK，提供与商业替代品相当的功能。该库目前由我作为个人开发者维护。为了筹集资金以持续开发并提供及时的支持和问题响应，这里列出了一些相关项目/服务供您支持。

<table>
  <tbody>
    <tr>
      <td valign="top">
        <h2>Unity WebAR Foundation</h2>
        <p>
          <a href="https://assetstore.unity.com/packages/tools/integration/webar-foundation-250806">WebAR Foundation</a> 是一个Unity包，允许Unity开发者构建WebGL平台的AR应用程序。它作为一个Unity插件，包装了流行的Web SDK。
        </p>
        <p>
          如果您是Unity开发者，请查看！ <a href="https://github.com/hiukim/unity-webar-foundation" target="_blank">https://github.com/hiukim/unity-webar-foundation</a>
        </p>
        <p>
      </td>
      <td><img src="https://user-images.githubusercontent.com/459126/240146462-c7c2559d-cde9-43cd-846a-cf490ce99bb3.png" border="10"/></td>
    </tr>
    <tr>
      <td valign="top">
        <h2>Web AR 开发课程</h2>
        <p>我在Udemy上提供WebAR开发课程。这是一个非常全面的Web AR开发指南，不仅限于MindAR。</p>
        <p>如果您感兴趣请查看：<a target="_blank" href="https://www.udemy.com/course/introduction-to-web-ar-development/?referralCode=D2565F4CA6D767F30D61">https://www.udemy.com/course/introduction-to-web-ar-development/?referralCode=D2565F4CA6D767F30D61</a></p>
      </td>
      <td width="50%">
        <img src="https://user-images.githubusercontent.com/459126/141425015-f5fe2912-b26d-4366-8952-5866a072fb34.jpg"/>
      </td>
    </tr>
    <tr>
      <td valign="top">
        <h2>MindAR Studio</h2>
        <p>
          MindAR Studio 允许您在不编码的情况下构建面部跟踪AR。您可以通过拖放编辑器构建AR效果，并导出静态网页进行自托管。免费使用！
        </p>
        <p>
          如果您感兴趣请查看！ <a href="https://studio.mindar.org" target="_blank">https://studio.mindar.org</a>
        </p>
      </td>
      <td><img src="https://www.mindar.org/content/images/2022/07/screenshot.png" border="10"/></td>
    </tr>    
    <tr>
      <td valign="top">
        <h2>Pictarize</h2>
        <p>
          Pictarize 是一个用于创建和发布图像跟踪AR应用程序的托管平台。免费使用！
        </p>
        <p>
          如果您感兴趣请查看！ <a href="https://pictarize.com" target="_blank">https://pictarize.com</a>
        </p>
      </td>
      <td><img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/pictarize-studio-98ea8d35d963ebcd7d31ca7695c3f984.png" border="10"/></td>
    </tr>
  </tbody>
</table>

# 文档

官方文档：https://hiukim.github.io/mind-ar-js-doc

# 演示 - 亲自试试

<table>
  <tbody>
    <tr>
      <td valign="top" width="50%">
        <h2>图像跟踪 - 基础示例</h2>
        <p>演示视频：https://youtu.be/hgVB9HpQpqY </p>
        <p>亲自试试：https://hiukim.github.io/mind-ar-js-doc/examples/basic/</p>
      </td>
      <td>
        <img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/basic-demo-fde07aa7567bf213e61b37dbaa192fec.gif" width="300px">
      </td>
    </tr>
    <tr>
      <td valign="top">
        <h2>图像跟踪 - 多目标示例</h2>
        <p>亲自试试：https://hiukim.github.io/mind-ar-js-doc/examples/multi-tracks</p>
      </td>
      <td>
        <img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/multi-targets-demo-8b5fc868f6b0847a9818e8bf0ba2c1c3.gif" width="300px">
      </td>
    </tr>
    <tr>
      <td valign="top">
        <h2>图像跟踪 - 交互式示例</h2>
        <p>演示视频：https://youtu.be/gm57gL1NGoQ</p>
        <p>亲自试试：https://hiukim.github.io/mind-ar-js-doc/examples/interative</p>
      </td>
      <td>
        <img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/interactive-demo-1ab348a381cbd808f4d52c8750524d11.gif" width="300px"/>
      </td>
    </tr>
    <tr>
      <td valign="top">
        <h2>面部跟踪 - 虚拟试穿示例</h2>
        <p>亲自试试：https://hiukim.github.io/mind-ar-js-doc/face-tracking-examples/tryon</p>
      </td>
      <td>
        <img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/face-tryon-demo-369c4ba701f1df2099ecf05c27f0c944.gif"  width="300px"/>
      </td>
    </tr>
    <tr>
      <td valign="top">
        <h2>面部跟踪 - 面部网格效果</h2>
        <p>亲自试试：https://hiukim.github.io/mind-ar-js-doc/more-examples/threejs-face-facemesh</p>
      </td>
      <td>
        <img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/face-mesh-demo-8f5bd8d1bcbffbdb76896b58171ecc8a.gif"  width="300px"/>
      </td>
    </tr>
    <tr>
      <td valign="top">
        <h2>🦝 浣熊面部跟踪（本项目演示）</h2>
        <p>完全本地化的面部跟踪演示，支持4种不同配置</p>
        <p>立即体验：<code>npm run dev</code> 然后访问 <code>/Raccoon/</code></p>
        <ul>
          <li>🎯 纯本地源码版（推荐）</li>
          <li>🔄 混合版（CDN库+本地模型）</li>  
          <li>📦 本地优化版</li>
          <li>🔒 稳定兼容版</li>
        </ul>
      </td>
      <td>
        <img src="https://user-images.githubusercontent.com/459126/placeholder-raccoon-demo.gif" width="300px" alt="浣熊面部跟踪演示"/>
        <p style="font-size: 12px; text-align: center;">🦝 实时表情同步 + GPU检测</p>
      </td>
    </tr>
  </tbody>
</table>

### 更多示例

更多示例可以在这里找到：https://hiukim.github.io/mind-ar-js-doc/examples/summary

# 快速开始
学习如何在5分钟内用纯文本编辑器构建上述基础示例！

快速开始指南：https://hiukim.github.io/mind-ar-js-doc/quick-start/overview

为了让您快速了解，这是基础示例的完整源代码。它是静态HTML页面，您可以在任何地方托管它。

```html
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.1.4/dist/mindar-image.prod.js"></script>
    <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.1.4/dist/mindar-image-aframe.prod.js"></script>
  </head>
  <body>
    <a-scene mindar-image="imageTargetSrc: https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.1.4/examples/image-tracking/assets/card-example/card.mind;" color-space="sRGB" renderer="colorManagement: true, physicallyCorrectLights" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
      <a-assets>
        <img id="card" src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.1.4/examples/image-tracking/assets/card-example/card.png" />
        <a-asset-item id="avatarModel" src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.1.4/examples/image-tracking/assets/card-example/softmind/scene.gltf"></a-asset-item>
      </a-assets>

      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
      <a-entity mindar-image-target="targetIndex: 0">
        <a-plane src="#card" position="0 0 0" height="0.552" width="1" rotation="0 0 0"></a-plane>
        <a-gltf-model rotation="0 0 0 " position="0 0 0.1" scale="0.005 0.005 0.005" src="#avatarModel" animation="property: position; to: 0 0.1 0.1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate">
      </a-entity>
    </a-scene>
  </body>
</html>
```

# 目标图像编译器
您可以使用这个友好的编译器工具直接在浏览器中编译自己的目标图像。如果您不知道这是什么，请参阅快速开始指南。

https://hiukim.github.io/mind-ar-js-doc/tools/compile

<img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/step2-9f3c4dcb8a2e60766d86f950d06929ea.png" width="300"/>

# 路线图
1. 支持更多增强现实功能，如手部跟踪、身体跟踪和平面跟踪

2. 研究不同的最先进算法以提高跟踪精度和性能

3. 更多教育参考资料

# 贡献
我个人并不来自强大的计算机视觉背景，在提高跟踪精度方面遇到困难。我真的需要计算机视觉专家的帮助。请联系并讨论。

也欢迎JavaScript专家帮助处理非引擎部分，如改进API等。

如果您是图形设计师或3D艺术家，可以为视觉效果做出贡献。即使您只是使用MindAR开发一些酷炫的应用程序，请向我们展示！

无论您能想到什么。这是一个为每个人提供的开源网页AR框架！

# 开发指南

#### 目录说明

1. `/src` 文件夹包含大部分源代码
2. `/examples` 文件夹包含开发期间测试的示例
3. `/Raccoon` 文件夹包含浣熊面部跟踪演示

#### 创建生产构建

运行 `> npm run build`。构建将在 `dist` 文件夹中生成

#### 开发环境

要开发 ThreeJS 版本，运行 `> npm run watch`。这将观察 `src` 文件夹中的文件更改并持续在 `dist-dev` 中构建文件。

要开发 AFRAME 版本，每次进行更改时都需要运行 `>npm run build-dev`。`--watch` 参数目前无法自动生成 `mindar-XXX-aframe.js`。

`examples` 文件夹中的所有示例都配置为使用此开发构建，因此您可以在浏览器中打开这些示例开始调试或开发。

示例应该在桌面浏览器中运行，它们只是html文件，所以很容易开始开发。但是，因为需要摄像头访问，所以您需要一个网络摄像头。另外，您需要使用某个localhost web服务器运行html文件。简单地打开文件是不行的。

例如，您可以安装这个Chrome插件来启动本地服务器：`https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en`

您很可能也想在移动设备上测试。在这种情况下，最好设置您的开发环境以能够将您的localhost web服务器共享给您的移动设备。如果您在防火墙后面有困难，那么您可以使用类似 `ngrok` (https://ngrok.com/) 的工具来隧道请求。但这不是理想的解决方案，因为MindAR的开发构建不小（>10Mb），使用免费版本的 `ngrok` 隧道可能会很慢。

#### WebGL后端
此库利用 tensorflowjs (https://github.com/tensorflow/tfjs) 作为 WebGL 后端。是的，tensorflow 是一个机器学习库，但我们没有将其用于机器学习！:) Tensorflowjs 有一个非常强大的 WebGL 引擎，允许我们编写通用GPU应用程序（在这种情况下，我们的AR应用程序）。

核心检测和跟踪算法是用 tensorflowjs 中的自定义操作编写的。它们就像着色器程序。一开始可能看起来令人生畏，但实际上并不难理解。

# 致谢
计算机视觉的想法借鉴自 artoolkit（即 https://github.com/artoolkitx/artoolkit5）。不幸的是，该库似乎不再维护。

面部跟踪基于 mediapipe 面部网格模型（即 https://google.github.io/mediapipe/solutions/face_mesh.html）

