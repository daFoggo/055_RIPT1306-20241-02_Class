import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { IReuseBreadcrumb } from "@/models/ReuseBreadcrumb/type";

const ReuseBreadcrumb = ({ pageList }: IReuseBreadcrumb) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem key="Home">
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {pageList.map((page, index) => (
          <div key={page.name}>
            <BreadcrumbItem>
              <BreadcrumbLink href={page.link}>{page.name}</BreadcrumbLink>
            </BreadcrumbItem>
            {index !== pageList.length - 1 && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default ReuseBreadcrumb;
