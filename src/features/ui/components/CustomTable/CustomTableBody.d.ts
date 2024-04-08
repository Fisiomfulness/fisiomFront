interface Props {
  items: {
    key: number;
    name: string;
    price: number;
    img: string;
    ticket: string;
  }[];
}
function CustomTableBody(props: Props): JSX.Element;

export default CustomTableBody;
