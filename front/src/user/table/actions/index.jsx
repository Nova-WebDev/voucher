import BlockUnblockAction from "./BlockUnblockAction";
import EditeUserAction from "./EditeUserAction";

export const userActions = ({ onEdit }) => [
  {
    label: () => "عملیات",
    render: (row) => (
      <div className="flex flex-col w-full gap-3 md:flex-row md:px-0">
        
        <BlockUnblockAction row={row} />
        <EditeUserAction row={row} onEdit={onEdit} />
      </div>
    ),
  },
  
];
