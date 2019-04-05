import { PinIcon } from '../shared-components/Icons';

export default ({ type, onClick = () => null, name, picture, lat, lng }) => {
  return (
    <div className={"w-8 h-8"}>
      <PinIcon onClick={onClick} type={type} picture={picture} lat={lat} lng={lng} name={name} />
    </div>
  );
}