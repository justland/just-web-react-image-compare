import{r as y,b as l,i as d}from"./fixtures-zdqk0kmY.js";import{O as m}from"./onion-skin-sxzNijb5.js";import"./iframe-DQ-Zw1za.js";import"./preload-helper-PPVm8Dsz.js";const{expect:a,fn:u,userEvent:n,waitFor:v}=__STORYBOOK_MODULE_TEST__,k={component:m,title:"Components/OnionSkin",tags:["autodocs","version:next"],parameters:{layout:"padded"},args:{base:l,compare:y}},c=e=>e.querySelector(`img[src="${y}"]`)?.parentElement,o={play:async({canvas:e,canvasElement:t})=>{await a(e.getByRole("slider",{name:"Onion skin opacity"})).toHaveValue("50"),await a(c(t)).toHaveStyle({opacity:"0.5"}),await v(()=>a(d(t)).toBe(!0))}},s={tags:["keyboard","unit"],args:{onOpacityChange:u()},play:async({args:e,canvas:t,canvasElement:p})=>{const i=t.getByRole("slider",{name:"Onion skin opacity"});await n.tab(),await a(i).toHaveFocus(),await n.keyboard("{ArrowRight}"),await a(i).toHaveValue("51"),await a(e.onOpacityChange).toHaveBeenLastCalledWith(51),await n.keyboard("{End}"),await a(i).toHaveValue("100"),await a(c(p)).toHaveStyle({opacity:"1"}),await n.keyboard("{Home}"),await a(c(p)).toHaveStyle({opacity:"0"})}},r={tags:["props"],name:"defaultOpacity",args:{defaultOpacity:80},play:async({canvas:e})=>{await a(e.getByRole("slider",{name:"Onion skin opacity"})).toHaveValue("80")}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvas,
    canvasElement
  }) => {
    await expect(canvas.getByRole('slider', {
      name: 'Onion skin opacity'
    })).toHaveValue('50');
    await expect(compareLayer(canvasElement)).toHaveStyle({
      opacity: '0.5'
    });
    await waitFor(() => expect(imagesReady(canvasElement)).toBe(true));
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  tags: ['keyboard', 'unit'],
  args: {
    onOpacityChange: fn()
  },
  play: async ({
    args,
    canvas,
    canvasElement
  }) => {
    const slider = canvas.getByRole('slider', {
      name: 'Onion skin opacity'
    });
    await userEvent.tab();
    await expect(slider).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(slider).toHaveValue('51');
    await expect(args.onOpacityChange).toHaveBeenLastCalledWith(51);
    await userEvent.keyboard('{End}');
    await expect(slider).toHaveValue('100');
    await expect(compareLayer(canvasElement)).toHaveStyle({
      opacity: '1'
    });
    await userEvent.keyboard('{Home}');
    await expect(compareLayer(canvasElement)).toHaveStyle({
      opacity: '0'
    });
  }
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  tags: ['props'],
  name: 'defaultOpacity',
  args: {
    defaultOpacity: 80
  },
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByRole('slider', {
      name: 'Onion skin opacity'
    })).toHaveValue('80');
  }
}`,...r.parameters?.docs?.source}}};const b=["Default","KeyboardNavigation","DefaultOpacity"];export{o as Default,r as DefaultOpacity,s as KeyboardNavigation,b as __namedExportsOrder,k as default};
