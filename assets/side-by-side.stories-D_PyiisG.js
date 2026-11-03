import{j as o}from"./jsx-runtime-u17CrQMm.js";import{r as i,b as c,i as m}from"./fixtures-DcJ9Sym_.js";import{S as p}from"./side-by-side-CYMD6RCY.js";import"./iframe-DFD1PYRM.js";import"./preload-helper-PPVm8Dsz.js";const{expect:r,waitFor:d}=__STORYBOOK_MODULE_TEST__,w={component:p,title:"Components/SideBySide",tags:["autodocs","version:next"],parameters:{layout:"padded"},args:{base:c,compare:i}},t={play:async({canvas:e,canvasElement:s})=>{await r(e.getByText("Base")).toBeVisible(),await r(e.getByText("Compare")).toBeVisible(),await d(()=>r(m(s)).toBe(!0))}},a={tags:["usecase"],name:"Wraps when narrow",decorators:[e=>o.jsx("div",{style:{width:320},children:o.jsx(e,{})})],play:async({canvasElement:e})=>{const[s,n]=Array.from(e.querySelectorAll("figure"));await r(n.getBoundingClientRect().top).toBeGreaterThan(s.getBoundingClientRect().bottom-1)}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};const x=["Default","Narrow"];export{t as Default,a as Narrow,x as __namedExportsOrder,w as default};
