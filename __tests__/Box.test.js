// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
// $FlowFixMe
import chai from 'chai';
import { Box } from '../dist-modules';
import defaultTheme, { getRadius, getMarginOrPadding } from '../dist-modules/defaultTheme';
import rendererWithContext from './helpers/rendererWithContext';

const getStyleNode = () => {
  const node = document.getElementById('fela-stylesheet');
  return node && node.textContent;
};

test('Box renders correctly', () => {
  const tree = renderer.create(rendererWithContext(
    <Box>some text inside box component</Box>
  )).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Box renders correctly as button', () => {
  const tree = renderer.create(rendererWithContext(
    <Box as="button">some text inside button</Box>
  )).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Box renders correctly with set styling', () => {
  const tree = renderer.create(rendererWithContext(
    <Box margin={25} padding={25} backgroundColor="#000000">some text inside box component</Box>
  )).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should set correct styling', () => {
  mount(rendererWithContext(
    <Box
      display="block"
      backgroundColor="#000000"
      border="2px solid #eeeeee"
      zIndex={3}
    >
      some text inside box component
    </Box>
  ));
  const styleNode = getStyleNode();
  if (styleNode) {
    chai.assert(styleNode.includes('display:block'));
    chai.assert(styleNode.includes('background-color:#000000'));
    chai.assert(styleNode.includes('border:2px solid #eeeeee'));
    chai.assert(styleNode.includes('z-index:3'));
  }
});

it('should set correct styling using style prop', () => {
  mount(rendererWithContext(
    <Box
      style={{
        display: 'block',
        backgroundColor: '#000000',
        border: '2px solid #eeeeee',
        zIndex: 3,
      }}
    >
      some text inside box component
    </Box>
  ));
  const styleNode = getStyleNode();
  if (styleNode) {
    chai.assert(styleNode.includes('display:block'));
    chai.assert(styleNode.includes('background-color:#000000'));
    chai.assert(styleNode.includes('border:2px solid #eeeeee'));
    chai.assert(styleNode.includes('z-index:3'));
  }
});


it('should set correct box margin', () => {
  const size = 20;
  mount(rendererWithContext(
    <Box margin={size}>
      some text inside box component
    </Box>
  ));
  const styleNode = getStyleNode();
  if (styleNode) {
    chai.assert(styleNode.includes(`margin-top:${size}px`));
    chai.assert(styleNode.includes(`margin-bottom:${size}px`));
    chai.assert(styleNode.includes(`margin-right:${size}px`));
    chai.assert(styleNode.includes(`margin-left:${size}px`));
  }
});

it('should set correct box padding', () => {
  const size = 20;
  mount(rendererWithContext(
    <Box padding={size}>
      some text inside box component  const scaleSize = defaultTheme.scale[size];

    </Box>
  ));
  const styleNode = getStyleNode();
  if (styleNode) {
    chai.assert(styleNode.includes(`padding-top:${size}px`));
    chai.assert(styleNode.includes(`padding-bottom:${size}px`));
    chai.assert(styleNode.includes(`padding-right:${size}px`));
    chai.assert(styleNode.includes(`padding-left:${size}px`));
  }
});

it('should set correct box margin using shorthand property', () => {
  const size = 20;
  mount(rendererWithContext(
    <Box ml={size}>
      some text inside box component
    </Box>
  ));
  const styleNode = getStyleNode();
  styleNode && chai.assert(styleNode.includes(`margin-left:${size}px`));
});

it('should set correct box padding using shorthand property', () => {
  const size = 20;
  mount(rendererWithContext(
    <Box pt={size}>
      some text inside box component
    </Box>
  ));
  const styleNode = getStyleNode();
  styleNode && chai.assert(styleNode.includes(`padding-top:${size}px`));
});

it('should set correct box margin using string value with units', () => {
  const size = '4px';
  mount(rendererWithContext(
    <Box marginTop={size}>
      some text inside box component
    </Box>
  ));
  const styleNode = getStyleNode();
  styleNode && chai.assert(styleNode.includes(`margin-top:${size}`));
});

it('should set correct box margin using string value without units', () => {
  const size = '30';
  mount(rendererWithContext(
    <Box marginBottom={size}>
      some text inside box component
    </Box>
  ));
  const styleNode = getStyleNode();
  styleNode && chai.assert(styleNode.includes(`margin-bottom:${size}px`));
});

it('should set correct box margin using string 0 auto', () => {
  const size = '0 auto';
  mount(rendererWithContext(
    <Box marginHorizontal={size}>
      some text inside box component
    </Box>
  ));
  const styleNode = getStyleNode();
  if (styleNode) {
    chai.assert(styleNode.includes(`margin-left:${size}`));
    chai.assert(styleNode.includes(`margin-right:${size}`));
  }
});

it('should set correct box margin using scale value', () => {
  const size = 4;
  mount(rendererWithContext(
    <Box ml={size}>
      some text inside box component
    </Box>
  ));
  const styleNode = getStyleNode();
  styleNode && chai.assert(styleNode.includes(`margin-left:${getMarginOrPadding(size, defaultTheme)}`));
});

it('should set correct box size', () => {
  const size = 300;
  mount(rendererWithContext(
    <Box width={size} height={size}>
      some text inside box component
    </Box>
  ));
  const styleNode = getStyleNode();
  if (styleNode) {
    chai.assert(styleNode.includes(`width:${size}px`));
    chai.assert(styleNode.includes(`height:${size}px`));
  }
});

it('should set correct percentage box width', () => {
  const size = 1;
  mount(rendererWithContext(
    <Box width={size}>
      some text inside box component
    </Box>
  ));
  const styleNode = getStyleNode();
  styleNode && chai.assert(styleNode.includes(`width:${size * 100}%`));
});

it('should set correct box width using string value', () => {
  const size = '1px';
  mount(rendererWithContext(
    <Box width={size}>
      some text inside box component
    </Box>
  ));
  const styleNode = getStyleNode();
  styleNode && chai.assert(styleNode.includes(`width:${size}`));
});

it('should set correct box position', () => {
  const position = 5;
  mount(rendererWithContext(
    <Box position="absolute" top={position}>
      some text inside box component
    </Box>
  ));
  const styleNode = getStyleNode();
  if (styleNode) {
    chai.assert(styleNode.includes('position:absolute'));
    chai.assert(styleNode.includes(`top:${position}px`));
  }
});

it('should set correct box position using string value', () => {
  const position = '10px';
  mount(rendererWithContext(
    <Box position="absolute" left={position}>
      some text inside box component
    </Box>
  ));
  const styleNode = getStyleNode();
  if (styleNode) {
    chai.assert(styleNode.includes('position:absolute'));
    chai.assert(styleNode.includes(`left:${position}`));
  }
});

it('should set correct box pseudo classes', () => {
  mount(rendererWithContext(
    <Box
      backgroundColor="red"
      style={{
        ':hover': {
          backgroundColor: 'green',
        },
      }}
    >
      hover buttonn
    </Box>
  ));
  const styleNode = getStyleNode();
  if (styleNode) {
    chai.assert(styleNode.includes('background-color:red'));
    chai.assert(styleNode.includes(':hover{background-color:green}'));
  }
});

it('should set correct box border radius using scale', () => {
  const scale = 'small';
  mount(rendererWithContext(
    <Box borderRadius={scale}>
      some text inside box component
    </Box>
  ));
  const expectedRadius = getRadius(scale, defaultTheme);
  const styleNode = getStyleNode();
  if (styleNode) {
    chai.assert(styleNode.includes(`border-bottom-right-radius:${expectedRadius}`));
    chai.assert(styleNode.includes(`border-bottom-left-radius:${expectedRadius}`));
    chai.assert(styleNode.includes(`border-top-right-radius:${expectedRadius}`));
    chai.assert(styleNode.includes(`border-top-left-radius:${expectedRadius}`));
  }
});

it('should set correct box border radius using number', () => {
  const size = 20;
  mount(rendererWithContext(
    <Box borderBottomLeftRadius={size}>
      some text inside box component
    </Box>
  ));
  const styleNode = getStyleNode();
  const expectedRadius = getRadius(20);
  styleNode && chai.assert(styleNode.includes(`border-bottom-left-radius:${expectedRadius}`));
});
