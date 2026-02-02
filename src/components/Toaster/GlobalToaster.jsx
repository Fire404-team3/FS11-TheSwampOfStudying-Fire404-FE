import { Toaster } from 'react-hot-toast';

const GlobalToaster = () => {
  return (
    <Toaster
      position="bottom-center"
      containerStyle={{
        // 가장 위로 올라오게
        zIndex: 100000,
      }}
      toastOptions={{
        // 1. 공통 스타일
        style: {
          maxWidth: '37.5rem',
          width: 'fit-content', // 내용물만큼 늘어나기
          minWidth: '18.75rem',
          borderRadius: '0.75rem',
          fontSize: '1rem',
          padding: '0.875rem 1.125rem',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.625rem',
        },

        // 2. 성공 스타일
        success: {
          style: {
            background: '#E1EDDE',
            color: '#578246',
          },
        },

        // 3. 에러 스타일
        error: {
          style: {
            background: '#FDE0E9',
            color: '#F50E0E',
          },
        },
      }}
    />
  );
};

export default GlobalToaster;
