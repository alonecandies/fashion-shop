import { FaAngleUp } from 'react-icons/fa';

export default function ScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0
    });
  };

  return (
    <div className="scroll-to-top-btn">
      <FaAngleUp onClick={scrollToTop} />
    </div>
  );
}
