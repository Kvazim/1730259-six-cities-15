import { MemoizedOfferGalery } from './offer-galery';
import { render } from '@testing-library/react';

const testImages = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6', 'img7', 'img8', 'img9', 'img10', 'img11'];

describe('OfferGalery', () => {
  it('should render correctly', () => {
    const {container} = render(<MemoizedOfferGalery images={testImages} />);
    expect(container).toMatchSnapshot();
  });
});
