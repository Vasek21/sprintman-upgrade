import { InfoItem } from "uu5g05-elements";
const CommonHelper = {
  getSprintSelectComponent(data = {}) {
    return <InfoItem title={data.name} icon={data.icon} subtitle={data.state} size="xs" />;
  },
};

export default CommonHelper;
