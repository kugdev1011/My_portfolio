import React, { useRef } from 'react';
import { Text } from '@react-three/drei';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

import Footer from './Footer';
import ImageSection from './ImageSection';
import InfoSection from './InfoSection';

import configs from '../../../configs';
import theme from '../../../theme';

const { pages } = configs;

function Face({ rotation, position, displayAt, ...page }) {
  const scroll = useScroll();
  const faceRef = useRef();

  useFrame(() => {
    console.log(scroll.offset, 'this is offset');
    if (displayAt) {
      const offset = 0.03;
      const newScale =
        page.scale * scroll.curve(displayAt - offset, displayAt - offset);
      faceRef.current.scale.x = newScale;
      faceRef.current.scale.z = newScale;
      faceRef.current.scale.y = newScale;
    }
  });

  return (
    <mesh
      ref={faceRef}
      className='content'
      scale={15}
      rotation={rotation}
      position={position}
    >
      <Text position={[0, 0.5, 0.01]} color={theme.colors.light}>
        {page.title}
      </Text>
      <ImageSection imageList={page?.imageList} />
      <InfoSection infos={page.infos} />
      <Footer footer={page.footer} />
    </mesh>
  );
}

function Page() {
  return (
    <group>
      {pages.map((page) => {
        return <Face {...page} />;
      })}
    </group>
  );
}

export default Page;
