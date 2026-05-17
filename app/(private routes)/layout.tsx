type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default function PrivateLayout({ children, modal }: Props) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}