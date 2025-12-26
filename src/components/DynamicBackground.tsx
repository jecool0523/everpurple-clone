import { motion, useScroll, useTransform } from 'framer-motion';

export const DynamicBackground = () => {
  // 전체 페이지 스크롤 진행률 (0.0 ~ 1.0) 감지
  const { scrollYProgress } = useScroll();

  // --- 레이어별 투명도 조절 (스크롤 위치에 매핑) ---

  // 1. Base Layer (초반): 시작부터 보이다가 중간(40~60%)쯤 서서히 사라짐
  const baseLayerOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6], [1, 1, 0]);

  // 2. Middle Layer (중반 분위기): 초반엔 없다가 20% 지점부터 나타나서 50%에 최대, 80%에 다시 사라짐
  // 원본의 중반부 붉은/보라빛 분위기를 담당합니다.
  const middleLayerOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 0.8, 0]);

  // 3. Final Image Layer (후반): 70% 지점부터 나타나기 시작해서 끝까지 유지
  const finalLayerOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);


  return (
    // 전체 화면을 덮는 고정 컨테이너 (가장 뒤쪽 z-index: -1)
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-black">

      {/* --- Layer 1: 기본 그라데이션 (초반) --- */}
      {/* Tailwind CSS radial gradient를 활용해 중앙에서 퍼지는 은은한 빛 표현 */}
      <motion.div
        style={{ opacity: baseLayerOpacity }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(120,50,255,0.15),_rgba(0,0,0,0)_70%)]"
      />
       {/* 조금 더 어두운 기본 배경색을 깔아줍니다. */}
      <motion.div
        style={{ opacity: baseLayerOpacity }}
         // 기존 index.css에 정의된 background 색상을 사용하여 통일감 부여
        className="absolute inset-0 bg-background transition-colors duration-500"
      />


      {/* --- Layer 2: 중반 분위기 전환용 그라데이션 --- */}
      {/* 분위기가 고조될 때 살짝 더 붉거나 진한 보라색 느낌을 추가 */}
      <motion.div
        style={{ opacity: middleLayerOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-transparent to-black/50 mix-blend-overlay"
      />


      {/* --- Layer 3: 마지막 이미지 (후반) --- */}
      <motion.div
        style={{ opacity: finalLayerOpacity }}
        // 1단계에서 준비한 이미지 경로입니다.
        // bg-cover로 설정하여 화면을 꽉 채웁니다.
        className="absolute inset-0 bg-[url('https://static-assets.everpurple.kr/history/images/10/Mashup_img_08.png')] bg-cover bg-center bg-no-repeat"
      >
        {/* 이미지 위에 살짝 어두운 오버레이를 씌워 텍스트 가독성을 높입니다. */}
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

    </div>
  );
};
