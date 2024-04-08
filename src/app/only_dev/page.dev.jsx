import * as DocContents from "@/features/docs/contents";
import { Fragment } from "react";

const renderDocContents = Object.keys(DocContents).map((component, index) => {
  const Component = DocContents[component];
  return (
    <div
      key={index}
      className="py-3 flex flex-col gap-2 border-b border-primary last:border-0"
    >
      <Component />
    </div>
  );
});

const columns = [
  { name: "Componentes Reutilizables y utilidades", render: renderDocContents },
];

export default function OnlyDevelopmentPage() {
  return (
    <div className="overflow-auto mb-4">
      <p className="pb-2 text-lg">
        <b>{">"}</b> Todos los componentes y utilidades se deben usar desde{" "}
        <b>{`"@/features/ui"`}</b>
      </p>
      <div className="flex flex-row gap-4 flex-wrap">
        {columns.map((item) => {
          const count = Math.floor(item.render.length / 2) + 1;

          return (
            <Fragment key={item.name}>
              <div className="flex-1 min-w-80">
                <p className="text-lg font-bold underline">{item.name}</p>
                {item.render.slice(0, count)}
              </div>
              <div className="flex-1 min-w-80">{item.render.slice(count)}</div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
