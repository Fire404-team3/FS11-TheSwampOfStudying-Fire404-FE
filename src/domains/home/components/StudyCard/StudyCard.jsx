export default function StudyCard({ study }) {
  if (!study) {
    return <div>데이터 로딩 중...</div>;
  }

  const { name, points, description, background, createdAt, emojiLogs } = study;

  const startDate = new Date(createdAt);
  const today = new Date();

  const diffTime = today - startDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

  return (
    <article>
      <div>
        <div>
          <div>
            <h1>{name}</h1>
            <div>
              <span>🍃</span>
              <span>{points}P 획득</span>
            </div>
          </div>

          <p>{diffDays}일째 진행 중</p>
        </div>

        <div>
          <h2>{description}</h2>
        </div>
        <div>
          <div>👩‍💻 37</div>
          <div>🔥 26</div>
          <div>🤍 14</div>
        </div>
      </div>
    </article>
  );
}
