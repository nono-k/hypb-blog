import satori from 'satori';
import sharp from 'sharp';

export async function getOgImage(title) {
  const fontTitle = await getFontData('Shippori+Mincho');
  const fontSiteName = await getFontData('Noto+Serif+Display');
  const svg = await satori(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#202123',
        backgroundImage: 'radial-gradient(#e8eaed 5%, transparent 5%)',
        backgroundSize: '52px 52px',
        padding: '50px 68px',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#E8EAEDDD',
          borderRadius: '25px',
          padding: '24px 32px'
        }}
      >
      <div></div>
      <div style={{
        fontSize: 48,
        fontWeight: 700,
        padding: '0 140px 0 120px',
        lineHeight: 1.5
        }}>{title}</div>
      <div style={{
        alignSelf: 'flex-end',
        fontSize: 60,
        fontWeight: 700,
        }}>нуль</div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Shippori+Mincho',
          data: fontTitle,
          weight: 700,
          style: "normal"
        },
        {
          name: 'Noto+Serif+Display',
          data: fontSiteName,
          weight: 700,
          style: "normal"
        }
      ]
    }
  )
  return await sharp(Buffer.from(svg)).png().toBuffer();
}

async function getFontData(font) {
  const API = `https://fonts.googleapis.com/css2?family=${font}`;

  const css = await (
    await fetch(API, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
    })
  ).text();

  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (!resource) return;

  return await fetch(resource[1]).then((res) => res.arrayBuffer());
}