import{R as o}from"./iframe-DQ-Zw1za.js";import{r as i,b as c,i as l}from"./fixtures-zdqk0kmY.js";import{S as m}from"./side-by-side-DCgnm2G3.js";import"./preload-helper-PPVm8Dsz.js";const{expect:r,waitFor:p}=__STORYBOOK_MODULE_TEST__,B={component:m,title:"Components/SideBySide",tags:["autodocs","version:next"],parameters:{layout:"padded"},args:{base:c,compare:i}},t={play:async({canvas:e,canvasElement:n})=>{await r(e.getByText("Base")).toBeVisible(),await r(e.getByText("Compare")).toBeVisible(),await p(()=>r(l(n)).toBe(!0))}},a={tags:["usecase"],name:"Wraps when narrow",decorators:[e=>o.createElement("div",{style:{width:320}},o.createElement(e,null))],play:async({canvasElement:e})=>{const[n,s]=Array.from(e.querySelectorAll("figure"));await r(s.getBoundingClientRect().top).toBeGreaterThan(n.getBoundingClientRect().bottom-1)}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvas,
    canvasElement
  }) => {
    await expect(canvas.getByText('Base')).toBeVisible();
    await expect(canvas.getByText('Compare')).toBeVisible();
    await waitFor(() => expect(imagesReady(canvasElement)).toBe(true));
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  tags: ['usecase'],
  name: 'Wraps when narrow',
  decorators: [Story => <div style={{
    width: 320
  }}>
                <Story />
            </div>],
  play: async ({
    canvasElement
  }) => {
    const [first, second] = Array.from(canvasElement.querySelectorAll('figure'));
    await expect(second!.getBoundingClientRect().top).toBeGreaterThan(first!.getBoundingClientRect().bottom - 1);
  }
}`,...a.parameters?.docs?.source}}};const w=["Default","Narrow"];export{t as Default,a as Narrow,w as __namedExportsOrder,B as default};
