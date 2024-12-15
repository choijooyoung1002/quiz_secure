export interface Question {
  text: string;
  options: string[];
  correct: number;
}

export const questions: Question[] = [
  {
    text: "x²−5x+6=0의 두 근을 더한 값은 얼마일까요?",
    options: ["-6", "-5", "5", "6"],
    correct: 2  // -5가 정답
  },
  {
    text: "대한민국의 대통령이 탄핵소추를 당한 경우, 최종 판단은 누가 내리나요?",
    options: ["국회", "헌법재판소", "대법원", "중앙선거관리위원회"],
    correct: 1 
  },
  {
    text: "2023년 기준, 전 세계에서 가장 많은 인구를 가진 나라는 어디일까요?",
    options: ["중국", "인도", "미국", "인도네시아"],
    correct: 1  // 인도가 정답
  },
  {
    text: "우리 학교 교가에 나오는 산은 무엇일까요?",
    options: ["관악산", "백두산", "금강산", "지리산"],
    correct: 0  
  },
  {
    text: "두 집합 A={1,2,3,4}와 B={3,4,5,6}의 교집합의 원소의 개수는 몇 개일까요?",
    options: ["1", "2", "3", "4"],
    correct: 2
  },
  {
    text: "영신고등학교 교장 선생님의 이름은 무엇일까요?",
    options: ["조경순", "김철수", "이영희", "박희정"],
    correct: 0
  },
  {
    text: "대한민국의 선거 4대 원칙이 아닌 것은 무엇일까요?",
    options: ["비밀선거", "직접선거", "평등선거", "자유선거"],
    correct: 3
  },
  {
    text: "f(x)=2x+3일 때, f(5)의 값은 얼마일까요?",
    options: ["10", "11", "12", "13"],
    correct: 3
  },
  {
    text: "다음 중 대한민국의 국회의원 선거 주기는 무엇일까요?",
    options: ["2년", "3년", "4년", "5년"],
    correct: 2
  }
];
export function getRandomQuestions() {    const shuffled = questions.sort(() => 0.5 - Math.random());    return shuffled.slice(0, 4);}