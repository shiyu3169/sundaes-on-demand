import { render, screen } from '@testing-library/react'

import Options from './Options'

test('displays image for each scoop from server', async () => {
  render(<Options optionType='scoops' />)

  // find images
  const scoopImages = await screen.findAllByRole('img', {
    name: /scoop$/i,
  })
  expect(scoopImages).toHaveLength(2)

  // confirm alt text of images
  const altText = scoopImages.map((ele) => ele.alt)
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop'])
})
