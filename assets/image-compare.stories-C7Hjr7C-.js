import{u as j,c as V,r as K,b as q,i as k}from"./fixtures-zdqk0kmY.js";import{r as F,R as t}from"./iframe-DQ-Zw1za.js";import{O as z}from"./onion-skin-sxzNijb5.js";import{S as X}from"./side-by-side-DCgnm2G3.js";import{S as P}from"./swipe-Bwm-arg3.js";import"./preload-helper-PPVm8Dsz.js";const J=["side-by-side","swipe","onion-skin"],Z={"side-by-side":"Side by side",swipe:"Swipe","onion-skin":"Onion skin"};function f({mode:A,defaultMode:a="side-by-side",onModeChange:n,showModeSwitcher:D=!0,className:U,style:x,...S}){const[Y,v]=j(A,a,n),[H,O]=F.useState(50),[T,N]=F.useState(50);return t.createElement("div",{className:U,style:{...V,...x}},D&&t.createElement("div",{role:"group","aria-label":"Comparison mode",style:{display:"flex",gap:0}},J.map((g,L)=>{const b=g===Y;return t.createElement("button",{key:g,type:"button","aria-pressed":b,onClick:()=>v(g),style:{font:"inherit",fontSize:"0.75rem",lineHeight:1.5,color:"inherit",padding:"4px 12px",margin:0,cursor:"pointer",border:"1px solid rgba(127, 127, 127, 0.5)",borderLeftWidth:L===0?1:0,borderRadius:L===0?"6px 0 0 6px":L===J.length-1?"0 6px 6px 0":0,backgroundColor:b?"rgba(127, 127, 127, 0.25)":"transparent",fontWeight:b?600:400}},Z[g])})),Y==="swipe"?t.createElement(P,{...S,position:H,onPositionChange:O}):Y==="onion-skin"?t.createElement(z,{...S,opacity:T,onOpacityChange:N}):t.createElement(X,{...S}))}f.__docgenInfo={description:`Compares two images the way GitHub's image diff does: side by side, swipe, or onion skin.
The swipe position and the onion skin opacity are kept when switching modes.`,methods:[],displayName:"ImageCompare",props:{base:{required:!0,tsType:{name:"string"},description:"The image to compare against, such as a baseline. Any `<img>` source works, including `data:` URLs."},compare:{required:!0,tsType:{name:"string"},description:"The image being compared, such as a new result. Any `<img>` source works, including `data:` URLs."},baseLabel:{required:!1,tsType:{name:"union",raw:"ReactNode | undefined",elements:[{name:"ReactNode"},{name:"undefined"}]},description:'Label for the base image. Defaults to `"Base"`.'},compareLabel:{required:!1,tsType:{name:"union",raw:"ReactNode | undefined",elements:[{name:"ReactNode"},{name:"undefined"}]},description:'Label for the compare image. Defaults to `"Compare"`.'},imageAnchor:{required:!1,tsType:{name:"union",raw:"ImageAnchor | undefined",elements:[{name:"union",raw:`| 'top-left'
| 'top-center'
| 'top-right'
| 'middle-left'
| 'middle-center'
| 'middle-right'
| 'bottom-left'
| 'bottom-center'
| 'bottom-right'`,elements:[{name:"literal",value:"'top-left'"},{name:"literal",value:"'top-center'"},{name:"literal",value:"'top-right'"},{name:"literal",value:"'middle-left'"},{name:"literal",value:"'middle-center'"},{name:"literal",value:"'middle-right'"},{name:"literal",value:"'bottom-left'"},{name:"literal",value:"'bottom-center'"},{name:"literal",value:"'bottom-right'"}]},{name:"undefined"}]},description:'Where each image sits when the two images differ in size. Defaults to `"top-left"`.'},compareImageBackgroundColor:{required:!1,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:"Background color behind the compare image."},showCheckerPattern:{required:!1,tsType:{name:"union",raw:"boolean | undefined",elements:[{name:"boolean"},{name:"undefined"}]},description:"Show a checkerboard behind the images so transparent pixels are visible. Defaults to `true`."},className:{required:!1,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},style:{required:!1,tsType:{name:"union",raw:"CSSProperties | undefined",elements:[{name:"CSSProperties"},{name:"undefined"}]},description:""},mode:{required:!1,tsType:{name:"union",raw:"ImageCompareMode | undefined",elements:[{name:"union",raw:"'side-by-side' | 'swipe' | 'onion-skin'",elements:[{name:"literal",value:"'side-by-side'"},{name:"literal",value:"'swipe'"},{name:"literal",value:"'onion-skin'"}]},{name:"undefined"}]},description:"The view to show. Set it to control the mode."},defaultMode:{required:!1,tsType:{name:"union",raw:"ImageCompareMode | undefined",elements:[{name:"union",raw:"'side-by-side' | 'swipe' | 'onion-skin'",elements:[{name:"literal",value:"'side-by-side'"},{name:"literal",value:"'swipe'"},{name:"literal",value:"'onion-skin'"}]},{name:"undefined"}]},description:'Initial mode when uncontrolled. Defaults to `"side-by-side"`.',defaultValue:{value:"'side-by-side'",computed:!1}},onModeChange:{required:!1,tsType:{name:"union",raw:"((mode: ImageCompareMode) => void) | undefined",elements:[{name:"unknown"},{name:"undefined"}]},description:"Called when the user picks a mode in the switcher."},showModeSwitcher:{required:!1,tsType:{name:"union",raw:"boolean | undefined",elements:[{name:"boolean"},{name:"undefined"}]},description:"Show the row of mode buttons. Defaults to `true`.",defaultValue:{value:"true",computed:!1}}}};const R="data:image/png;base64,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",_="data:image/png;base64,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CCyBBQILQGAJLBBYAAJLYAECC0BgCSwQWAACS2CBwAIQWAILEFgA2wXWj08ju3Egoabj3gDYhcACBBaAwBJYILAABJbAAoEFILAEFiCwACqB9SQSAIBxBBYAgMACABBYAAACCwCAQmDdfxIJAMA4AgsAQGABAAgsAACBBQCAwAIAEFgAAAILAACBBQAwTWAdRQIAMM7mh6NIAADGEVgAAAILAEBgAQAILAAABBYAgMACABBYAAAILAAAgQUAsIbA+v4oEgCAcQQWAMDwwHocCQDAOAILAEBgAQAILAAAgQUAgMACABBYAAACCwCA7QLru8eRAACMI7AAAAQWAIDAAgAQWAAAVALrUSQAAOMILAAAgQUAILAAAAQWAACFwPr2USQAAOMILAAAgQUAILAAAAQWAAACCwBAYAEACCwAAAQWAMA0gfUwEgCAcTbfPIwEAGAcgQUAILAAAAQWAIDAAgBAYAEAzCewPv3s8wQAYByBBQAgsAAABBYAgMACAEBgAQAILAAAgQUAgMACABBYAAACCwAAgQUAILAAAAQWAIDAAgBAYAEACCwAAIEFAIDAAgAQWAAAAgsAAIEFACCwAAAEFgAAAgsAQGABAAgsAACBBQCAwAIAEFgAAAILAACBBQAgsAAABBYAAAILAEBgAQAILAAABBYAgMACAFiCPwGX/nReYeJllQAAAABJRU5ErkJggg==",y="data:image/png;base64,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",{expect:e,fn:M,userEvent:o,waitFor:G}=__STORYBOOK_MODULE_TEST__,oA={component:f,title:"Components/ImageCompare",tags:["autodocs","version:next"],parameters:{layout:"padded"},args:{base:q,compare:K}},r={play:async({canvas:A})=>{await e(A.getByRole("button",{name:"Side by side"})).toHaveAttribute("aria-pressed","true"),await e(A.getByText("Base")).toBeVisible(),await e(A.queryByRole("slider")).toBeNull()}},B={tags:["unit","usecase"],args:{onModeChange:M()},play:async({args:A,canvas:a})=>{await o.click(a.getByRole("button",{name:"Swipe"})),await e(A.onModeChange).toHaveBeenLastCalledWith("swipe"),await e(a.getByRole("button",{name:"Swipe"})).toHaveAttribute("aria-pressed","true");const n=a.getByRole("slider",{name:"Swipe position"});n.focus(),await o.keyboard("{ArrowRight}"),await e(n).toHaveValue("51"),await o.click(a.getByRole("button",{name:"Onion skin"})),await e(A.onModeChange).toHaveBeenLastCalledWith("onion-skin"),await e(a.getByRole("slider",{name:"Onion skin opacity"})).toBeVisible(),await o.click(a.getByRole("button",{name:"Swipe"})),await e(a.getByRole("slider",{name:"Swipe position"})).toHaveValue("51")}},i={tags:["props"],name:"mode: controlled",args:{mode:"onion-skin",onModeChange:M()},play:async({args:A,canvas:a})=>{await o.click(a.getByRole("button",{name:"Swipe"})),await e(A.onModeChange).toHaveBeenCalledWith("swipe"),await e(a.getByRole("button",{name:"Onion skin"})).toHaveAttribute("aria-pressed","true"),await e(a.getByRole("slider",{name:"Onion skin opacity"})).toBeVisible()}},C={tags:["props"],name:"defaultMode: swipe",args:{defaultMode:"swipe"},play:async({canvas:A})=>{await e(A.getByRole("slider",{name:"Swipe position"})).toBeInTheDocument()}},Q={tags:["props"],name:"showModeSwitcher: false",args:{showModeSwitcher:!1,defaultMode:"swipe"},play:async({canvas:A})=>{await e(A.queryByRole("button")).toBeNull()}},I={tags:["usecase"],name:"data: URLs (vis panel)",args:{base:R,compare:_,baseLabel:"Baseline",compareLabel:"Result"},play:async({canvasElement:A})=>{await e(R.startsWith("data:image/png;base64,")).toBe(!0),await G(()=>e(k(A)).toBe(!0));const a=A.querySelector("img").parentElement.parentElement;await e(a.style.aspectRatio).toBe("600 / 400")}};function s(A){return{name:`imageAnchor: ${A}`,tags:["props"],args:{compare:y,imageAnchor:A,defaultMode:"onion-skin"}}}const E=s("top-left"),l=s("top-center"),c=s("top-right"),w=s("middle-left"),m=s("middle-center"),d=s("middle-right"),p=s("bottom-left"),u=s("bottom-center"),h={...s("bottom-right"),play:async({canvasElement:A})=>{await G(()=>e(k(A)).toBe(!0));const a=A.querySelector(`img[src="${y}"]`);await e(Number.parseFloat(a.style.left)).toBeCloseTo(100/3,3),await e(Number.parseFloat(a.style.top)).toBeCloseTo(25,3),await e(Number.parseFloat(a.style.width)).toBeCloseTo(200/3,3)}},W={name:"compareImageBackgroundColor: custom",tags:["props"],args:{compare:y,compareImageBackgroundColor:"#08e8e8",showCheckerPattern:!1,defaultMode:"swipe"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByRole('button', {
      name: 'Side by side'
    })).toHaveAttribute('aria-pressed', 'true');
    await expect(canvas.getByText('Base')).toBeVisible();
    await expect(canvas.queryByRole('slider')).toBeNull();
  }
}`,...r.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  tags: ['unit', 'usecase'],
  args: {
    onModeChange: fn()
  },
  play: async ({
    args,
    canvas
  }) => {
    await userEvent.click(canvas.getByRole('button', {
      name: 'Swipe'
    }));
    await expect(args.onModeChange).toHaveBeenLastCalledWith('swipe');
    await expect(canvas.getByRole('button', {
      name: 'Swipe'
    })).toHaveAttribute('aria-pressed', 'true');
    const swipe = canvas.getByRole('slider', {
      name: 'Swipe position'
    });

    // The swipe position survives a round trip through the other modes.
    swipe.focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(swipe).toHaveValue('51');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Onion skin'
    }));
    await expect(args.onModeChange).toHaveBeenLastCalledWith('onion-skin');
    await expect(canvas.getByRole('slider', {
      name: 'Onion skin opacity'
    })).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Swipe'
    }));
    await expect(canvas.getByRole('slider', {
      name: 'Swipe position'
    })).toHaveValue('51');
  }
}`,...B.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  tags: ['props'],
  name: 'mode: controlled',
  args: {
    mode: 'onion-skin',
    onModeChange: fn()
  },
  play: async ({
    args,
    canvas
  }) => {
    await userEvent.click(canvas.getByRole('button', {
      name: 'Swipe'
    }));
    await expect(args.onModeChange).toHaveBeenCalledWith('swipe');
    // The parent did not change \`mode\`, so the view stays on onion skin.
    await expect(canvas.getByRole('button', {
      name: 'Onion skin'
    })).toHaveAttribute('aria-pressed', 'true');
    await expect(canvas.getByRole('slider', {
      name: 'Onion skin opacity'
    })).toBeVisible();
  }
}`,...i.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  tags: ['props'],
  name: 'defaultMode: swipe',
  args: {
    defaultMode: 'swipe'
  },
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByRole('slider', {
      name: 'Swipe position'
    })).toBeInTheDocument();
  }
}`,...C.parameters?.docs?.source}}};Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  tags: ['props'],
  name: 'showModeSwitcher: false',
  args: {
    showModeSwitcher: false,
    defaultMode: 'swipe'
  },
  play: async ({
    canvas
  }) => {
    await expect(canvas.queryByRole('button')).toBeNull();
  }
}`,...Q.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  tags: ['usecase'],
  name: 'data: URLs (vis panel)',
  args: {
    base: baselineDataUrl,
    compare: resultDataUrl,
    baseLabel: 'Baseline',
    compareLabel: 'Result'
  },
  play: async ({
    canvasElement
  }) => {
    await expect(baselineDataUrl.startsWith('data:image/png;base64,')).toBe(true);
    await waitFor(() => expect(imagesReady(canvasElement)).toBe(true));
    const frame = canvasElement.querySelector('img')!.parentElement!.parentElement!;
    await expect(frame.style.aspectRatio).toBe('600 / 400');
  }
}`,...I.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:"anchorStory('top-left')",...E.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"anchorStory('top-center')",...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:"anchorStory('top-right')",...c.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:"anchorStory('middle-left')",...w.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:"anchorStory('middle-center')",...m.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:"anchorStory('middle-right')",...d.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:"anchorStory('bottom-left')",...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:"anchorStory('bottom-center')",...u.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  ...anchorStory('bottom-right'),
  play: async ({
    canvasElement
  }) => {
    // 400x300 inside a 600x400 frame: it sits a third in from the left and a quarter down.
    await waitFor(() => expect(imagesReady(canvasElement)).toBe(true));
    const small = canvasElement.querySelector<HTMLImageElement>(\`img[src="\${resultSmall}"]\`)!;
    await expect(Number.parseFloat(small.style.left)).toBeCloseTo(100 / 3, 3);
    await expect(Number.parseFloat(small.style.top)).toBeCloseTo(25, 3);
    await expect(Number.parseFloat(small.style.width)).toBeCloseTo(200 / 3, 3);
  }
}`,...h.parameters?.docs?.source}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  name: 'compareImageBackgroundColor: custom',
  tags: ['props'],
  args: {
    compare: resultSmall,
    compareImageBackgroundColor: '#08e8e8',
    showCheckerPattern: false,
    defaultMode: 'swipe'
  }
}`,...W.parameters?.docs?.source}}};const nA=["Default","ModeSwitcher","ControlledMode","DefaultMode","WithoutModeSwitcher","DataUrls","ImageAnchorTopLeft","ImageAnchorTopCenter","ImageAnchorTopRight","ImageAnchorMiddleLeft","ImageAnchorMiddleCenter","ImageAnchorMiddleRight","ImageAnchorBottomLeft","ImageAnchorBottomCenter","ImageAnchorBottomRight","CustomBackgroundColor"];export{i as ControlledMode,W as CustomBackgroundColor,I as DataUrls,r as Default,C as DefaultMode,u as ImageAnchorBottomCenter,p as ImageAnchorBottomLeft,h as ImageAnchorBottomRight,m as ImageAnchorMiddleCenter,w as ImageAnchorMiddleLeft,d as ImageAnchorMiddleRight,l as ImageAnchorTopCenter,E as ImageAnchorTopLeft,c as ImageAnchorTopRight,B as ModeSwitcher,Q as WithoutModeSwitcher,nA as __namedExportsOrder,oA as default};
