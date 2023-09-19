// Next ui
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";

type TProps = {
  data: TGETUsers[];
  isLoading: boolean;
};

export default function UserTable({ data, isLoading }: TProps) {
  return (
    <article>
      <h1 className="text-center my-5">User details</h1>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>User Id</TableColumn>
          <TableColumn>Username</TableColumn>
          <TableColumn>email</TableColumn>
          <TableColumn>phoneNumber</TableColumn>
          <TableColumn>address</TableColumn>
          <TableColumn>city</TableColumn>
          <TableColumn>zip</TableColumn>
        </TableHeader>
        {isLoading ? (
          <TableBody emptyContent={"Loading..."}>{[]}</TableBody>
        ) : (
          <TableBody>
            {data?.map((user) => (
              <TableRow key={user?.id}>
                <TableCell>{user?.id}</TableCell>
                <TableCell>{user?.username}</TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>{user?.phoneNumber}</TableCell>
                <TableCell>{user?.address}</TableCell>
                <TableCell>{user?.city}</TableCell>
                <TableCell>{user?.zip}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </article>
  );
}
