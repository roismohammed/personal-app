export interface PostData {
  id: number;
  image: string | null ;
  description: string | null;
  title: string;
  content: string | null;
  featured:string
  slug: string;
  category?: {
    id: number;
    name: string;
  } | null;
  category_id?: {
    id: number;
    name: string;
  } | number;
  tags:string
  created_at: string;
  updated_at: string;
}


export interface CategoryData {
    id: number,
    name: string
    description:string
}

export interface ProjectData {
  id: number;
  name: string;
  description: string;
  image: string;
  status:string
  tech_stack: string | string[] | null;
  link_demo: string;
  link_github: string;
  category?: {
    id: number;
    name: string;
  } | null;
  created_at: Date;
  updated_at: Date;
}

import { HugeiconsIconProps } from "@hugeicons/react";

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: HugeiconsIconProps['icon'] | null;
    isActive?: boolean;
    items?: NavItem[];
}
