import{r as u,b as w,i as g}from"./fixtures-DcJ9Sym_.js";import{S as y}from"./swipe-Gy8FPdMu.js";import"./iframe-DFD1PYRM.js";import"./preload-helper-PPVm8Dsz.js";import"./jsx-runtime-u17CrQMm.js";const{expect:a,fn:d,userEvent:o,waitFor:m}=__STORYBOOK_MODULE_TEST__,R={component:y,title:"Components/Swipe",tags:["autodocs","version:next"],parameters:{layout:"padded"},args:{base:w,compare:u}},s={play:async({canvas:n,canvasElement:t})=>{const e=n.getByRole("slider",{name:"Swipe position"});await a(e).toHaveValue("50"),await m(()=>a(g(t)).toBe(!0))}},r={tags:["keyboard","unit"],args:{onPositionChange:d()},play:async({args:n,canvas:t})=>{const e=t.getByRole("slider",{name:"Swipe position"});await o.tab(),await a(e).toHaveFocus(),await o.keyboard("{ArrowRight}{ArrowRight}"),await a(e).toHaveValue("52"),await o.keyboard("{ArrowLeft}"),await a(e).toHaveValue("51"),await o.keyboard("{PageUp}"),await a(e).toHaveValue("61"),await o.keyboard("{Home}"),await a(e).toHaveValue("0"),await o.keyboard("{End}"),await a(e).toHaveValue("100"),await a(n.onPositionChange).toHaveBeenLastCalledWith(100)}},i={tags:["unit","usecase"],play:async({canvas:n})=>{const t=n.getByRole("slider",{name:"Swipe position"}),e=t.getBoundingClientRect(),p=e.top+e.height/2;await o.pointer([{keys:"[MouseLeft>]",target:t,coords:{clientX:e.left+e.width*.5,clientY:p}},{target:t,coords:{clientX:e.left+e.width*.25,clientY:p}},{keys:"[/MouseLeft]",target:t,coords:{clientX:e.left+e.width*.25,clientY:p}}]),await a(Number(t.value)).toBeCloseTo(25,0)}},l={tags:["props"],name:"position: controlled",args:{position:30,onPositionChange:d()},play:async({args:n,canvas:t})=>{const e=t.getByRole("slider",{name:"Swipe position"});await o.tab(),await o.keyboard("{ArrowRight}"),await a(n.onPositionChange).toHaveBeenCalledWith(31),await a(e).toHaveValue("30")}},c={tags:["props"],name:"baseLabel and compareLabel",args:{baseLabel:"Baseline",compareLabel:"Result"},play:async({canvas:n})=>{await a(n.getByText("Baseline")).toBeVisible(),await a(n.getByText("Result")).toBeVisible()}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvas,
    canvasElement
  }) => {
    const slider = canvas.getByRole('slider', {
      name: 'Swipe position'
    });
    await expect(slider).toHaveValue('50');
    await waitFor(() => expect(imagesReady(canvasElement)).toBe(true));
  }
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  tags: ['keyboard', 'unit'],
  args: {
    onPositionChange: fn()
  },
  play: async ({
    args,
    canvas
  }) => {
    const slider = canvas.getByRole('slider', {
      name: 'Swipe position'
    });
    await userEvent.tab();
    await expect(slider).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}{ArrowRight}');
    await expect(slider).toHaveValue('52');
    await userEvent.keyboard('{ArrowLeft}');
    await expect(slider).toHaveValue('51');
    await userEvent.keyboard('{PageUp}');
    await expect(slider).toHaveValue('61');
    await userEvent.keyboard('{Home}');
    await expect(slider).toHaveValue('0');
    await userEvent.keyboard('{End}');
    await expect(slider).toHaveValue('100');
    await expect(args.onPositionChange).toHaveBeenLastCalledWith(100);
  }
}`,...r.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  tags: ['unit', 'usecase'],
  play: async ({
    canvas
  }) => {
    const slider = canvas.getByRole('slider', {
      name: 'Swipe position'
    });
    const rect = slider.getBoundingClientRect();
    const y = rect.top + rect.height / 2;
    await userEvent.pointer([{
      keys: '[MouseLeft>]',
      target: slider,
      coords: {
        clientX: rect.left + rect.width * 0.5,
        clientY: y
      }
    }, {
      target: slider,
      coords: {
        clientX: rect.left + rect.width * 0.25,
        clientY: y
      }
    }, {
      keys: '[/MouseLeft]',
      target: slider,
      coords: {
        clientX: rect.left + rect.width * 0.25,
        clientY: y
      }
    }]);
    await expect(Number((slider as HTMLInputElement).value)).toBeCloseTo(25, 0);
  }
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  tags: ['props'],
  name: 'position: controlled',
  args: {
    position: 30,
    onPositionChange: fn()
  },
  play: async ({
    args,
    canvas
  }) => {
    const slider = canvas.getByRole('slider', {
      name: 'Swipe position'
    });
    await userEvent.tab();
    await userEvent.keyboard('{ArrowRight}');
    await expect(args.onPositionChange).toHaveBeenCalledWith(31);
    // Controlled: the value stays where the parent put it.
    await expect(slider).toHaveValue('30');
  }
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  tags: ['props'],
  name: 'baseLabel and compareLabel',
  args: {
    baseLabel: 'Baseline',
    compareLabel: 'Result'
  },
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByText('Baseline')).toBeVisible();
    await expect(canvas.getByText('Result')).toBeVisible();
  }
}`,...c.parameters?.docs?.source}}};const x=["Default","KeyboardNavigation","DragInteraction","Controlled","CustomLabels"];export{l as Controlled,c as CustomLabels,s as Default,i as DragInteraction,r as KeyboardNavigation,x as __namedExportsOrder,R as default};
