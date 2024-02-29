import Router from "@/routes/Router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Popup from "@/components/Popup" 
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PopupStore from "@/store/popupStore";
import AdminPopupCreate from "./components/AdminPopupCreate";
function App() {
  const queryClient = new QueryClient();
  const { popup, title, popupState } = PopupStore(); 
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Router />
        <Footer />
      </QueryClientProvider> 
      {
        popup &&
        <Popup title={title} onClick={() => popupState(!popup)}>
          <>
          {
            (() => {
              switch (title) {
                case "등록":
                  return <AdminPopupCreate /> 
                default:
                  break;
              }
            })()
          }
          </>
        </Popup>
      }
    </>
  );
}

export default App;
