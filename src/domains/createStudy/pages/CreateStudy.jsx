// 전체 폼 상태(formData), 백엔드 fieldErrors 저장 및 전송

function CreateStudy() {
  return (
    <div>
      <div>스터디 만들기</div>
      <div>
        <>닉네임</>
        <>스터디 이름</>
        <>소개</>
        <>배경을 선택해주세요</>
        <>비밀번호</>
        <>비밀번호 확인</>
        <SubmitButton />
      </div>
    </div>
  );
}

export default CreateStudy;
