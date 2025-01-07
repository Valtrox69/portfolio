import { TypeAnimation } from 'react-type-animation';

function Typing (){

  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'AI Art',
        500,
        'Stable Diffusion',
        500,
        'Flux',
        500,
        'AniDiffusion',
        500,
        'DAZ3D',
        500
      ]}
      wrapper="span"
      speed={10}
      preRenderFirstString={true}
      style={{ marginLeft: '5px', fontSize: '1em', textAlign: 'left', color: "#84ffff", fontWeight: 'bold', display: 'inline-block', width: 'full'}}
      repeat={1}
    />
  );
};

export default Typing;