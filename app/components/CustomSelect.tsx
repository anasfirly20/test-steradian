type TProps = {
  label: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  dataToMap: any;
};

export default function CustomSelect({ label, onChange, dataToMap }: TProps) {
  return (
    <section className="grid">
      <label className="text-[#d4d4d8] text-sm">{label}</label>
      <select
        className="bg-transparent outline-none border-b-2 border-[#3f3f45] py-2"
        onChange={onChange}
      >
        {dataToMap?.map((data: any) => (
          <option key={data?.id} value={data?.id}>
            {data?.id}
          </option>
        ))}
      </select>
    </section>
  );
}
